import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Image} from './model';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FavUpdateService {

  constructor (private http: HttpClient ) {}


  addNewFav(image: Image): Promise<any> {
    const body = JSON.stringify(image);
    console.log('>>>>>data', body);
    return this.http.post('/giphyServer/addNew', body)
      .take(1)
      .toPromise();
  }


  deleteFav(image: Image): void {
    const queryString = new HttpParams()
      .set('email', image.email)
      .set('imageId', image.imageId)
    this.http.delete('/giphyServer/delete', { params: queryString})
      .subscribe(
        (value) => {
          console.log('successful',
            value);
        },
        response => {
          console.log('error', response);
        },
        () => {
          console.log('completed.');
        });
  }


}
