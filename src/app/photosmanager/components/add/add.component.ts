import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Photo } from '../../models/photo';
import { PhotoService } from '../../services/photo.services';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  photos = [
    'https://via.placeholder.com/150/92c952', 'https://via.placeholder.com/150/771796', 'https://via.placeholder.com/150/d32776', 'https://via.placeholder.com/150/f66b97'
  ];
  
  photo!: Photo;
  constructor(
    private dialogRef: MatDialogRef<AddComponent>,
    private photoService: PhotoService,
    ) { 
    }

  name = new FormControl('', [Validators.required]);
  url = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a title' : '';
  }

  ngOnInit(): void {
    this.photo = new Photo();
  }

  save() {
    
    this.photo.title = this.name.value;
    this.photo.thumbnailUrl = this.url.value;
    this.photo.url = this.url.value;

    this.photoService.addPhoto(this.photo).then(photo => {
      this.dialogRef.close(photo);
    });
    
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
