import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Photo } from '../models/photo';

@Injectable()
export class PhotoService {

  private _photos: BehaviorSubject<Photo[]>;

  private dataStore: {
    photos: Photo[];
  }

  constructor(private http: HttpClient, private route: Router) {
    this.dataStore = { photos: [] };
    this._photos = new BehaviorSubject<Photo[]>([]);
  }

  get photos(): Observable<Photo[]> {
    return this._photos.asObservable();
  }

  addPhoto(photo: Photo): Promise<Photo> {
    return new Promise((resolver, reject) => {
      photo.id = this.dataStore.photos.length + 1;
      this.dataStore.photos.push(photo);
      this._photos.next(Object.assign({}, this.dataStore).photos);
      resolver(photo);
    })
  }

  photoById(id: number) {
    return this.dataStore.photos.find(x => x.id == id);
  }
  url: string = 'http://jsonplaceholder.typicode.com/albums/1/photos'

  loadAll() {

    const photosUrl = 'http://jsonplaceholder.typicode.com/albums/1/photos'

    return this.http.get<Photo[]>(photosUrl)
      .subscribe(data => {
        this.dataStore.photos = data;
        this._photos.next(Object.assign({}, this.dataStore).photos);
      }, error => {
        console.log("Failed to fetch users")
      });
  }

  edited!: Photo | undefined;

  editPhoto(photo: Photo): Promise<Photo> {
    return new Promise((resolver, reject) => {
      console.log(photo.id)
      
      this.edited=this.dataStore.photos.find(u => u.id==photo.id)
      console.log(this.edited);
      console.log(photo.thumbnailUrl);
      if(this.edited!=undefined){ 
        if(photo.thumbnailUrl!=undefined){          
           this.edited.thumbnailUrl=photo.thumbnailUrl;
           this.edited.url = photo.url;}
          this.edited.title = photo.title;
      }
      
      console.log(this.edited)
      this._photos.next(Object.assign({}, this.dataStore).photos);
      resolver(photo);
    })
  }
  

  deletePhoto(id: number){
    this.dataStore.photos.forEach((value,index)=>{
      if(value.id==id) this.dataStore.photos.splice(index,1);})
      
      
  }
}
