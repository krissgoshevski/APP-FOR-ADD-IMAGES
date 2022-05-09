import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from '../../models/photo';
import { PhotoService } from '../../services/photo.services';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  photos!: Observable<Photo[]>;

  
  constructor(
    private photoService: PhotoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
    ) { 
        this.isShown=true;
    }

 @ViewChild(MatSidenav) sidenav!: MatSidenav;
isShown: boolean = true ; 

toggleShow() {
    this.isShown = ! this.isShown;
}


  ngOnInit(): void {
    this.photos = this.photoService.photos;
    this.photoService.loadAll();
    this.isShown=true;
  }

  openAddPhotoDialog(): void {
    let dialogRef = this.dialog.open(AddComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result)

      if (result) {
        this.openSnackBar("Photo added", "Navigate")
          .onAction().subscribe(() => {
              this.router.navigate(['/photosmanager', result.id]);
              this.isShown=false;
          });
      }
    })
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
}

}
