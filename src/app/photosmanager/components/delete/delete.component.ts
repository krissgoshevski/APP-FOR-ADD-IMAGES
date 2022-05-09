import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../../services/photo.services';
import { EditComponent } from '../edit/edit.component';
import { PhotosComponent } from '../photos/photos.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  itemId!: number
  isShown!: PhotosComponent

  constructor(
    private dialogRef: MatDialogRef<EditComponent>,
    private photoService: PhotoService,
    @Inject(MAT_DIALOG_DATA) data: {route: ActivatedRoute, isShown: PhotosComponent}
    ) { 
      data.route.params.subscribe(params => {this.itemId = params['id']});
      this.isShown=data.isShown;
    }
  ngOnInit(): void {
    console.log(this.isShown)
  }
  deleted: string = 'yes';
  delete() {
    
    this.photoService.deletePhoto(this.itemId)
        
    this.dialogRef.close(this.deleted);
        
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
