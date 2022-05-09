import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from '../../models/photo';
import { PhotoService } from '../../services/photo.services';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';
import { PhotosComponent } from '../photos/photos.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  photo?: Photo | null;
  constructor(
    private route: ActivatedRoute,
    private service: PhotoService,
    private photos: PhotosComponent,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    ) { }

    itemId : string | null = this.route.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (!id) id = 1;
      this.photo = null;

      this.service.photos.subscribe(photos => {
        if (photos.length == 0) return;

        setTimeout(() => {
          this.photo = this.service.photoById(id);
        }, 500)

      });

    })
  }
 
  onBack(){
    this.photos.isShown=true;
  }

  openEditDialog(id:number):void {
    console.log(this.itemId);
    
    let dialogRef = this.dialog.open(EditComponent,{
      data: {
        route: this.route
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result)

      if (result) {
        this.openSnackBar("Photo edited")
          
      }
    })
  }

  openSnackBar(message: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, "", {
      duration: 5000,
    });
  }

  openDeleteDialog(id:number):void {
    console.log(this.itemId);
    
    let dialogRef = this.dialog.open(DeleteComponent,{
      data: {
        route: this.route,
        isShown: this.photos.isShown
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result)
      if (result=='yes') {
        this.onBack();
      }
    })
  }

}
