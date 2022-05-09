import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../../models/photo';
import { PhotoService } from '../../services/photo.services';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  photos = [
    'https://via.placeholder.com/150/92c952', 'https://via.placeholder.com/150/771796', 'https://via.placeholder.com/150/d32776', 'https://via.placeholder.com/150/f66b97'
  ];

  itemId!: number
  photo!: Photo;
  constructor(
    private dialogRef: MatDialogRef<EditComponent>,
    private photoService: PhotoService,
    @Inject(MAT_DIALOG_DATA) data: {route: ActivatedRoute}
    ) { 
      data.route.params.subscribe(params => {this.itemId = params['id']});

    }
   
    
  
  name!: FormControl;
  url!: FormControl
  

  ngOnInit(): void {
    this.photo = new Photo();
     this.name = new FormControl(this.photoService.photoById(this.itemId)?.title);
      this.url = new FormControl(this.photoService.photoById(this.itemId)?.thumbnailUrl);        
    }
  

  save() {
    
      this.photo.thumbnailUrl = this.url.value;
      this.photo.url = this.url.value;
    
    this.photo.title = this.name.value;
    
    this.photo.id=this.itemId;

    this.photoService.editPhoto(this.photo)
    .then(photo => {
      this.dialogRef.close(photo);
    });
    
  }

  dismiss() {
    this.dialogRef.close(null);
  }


}
