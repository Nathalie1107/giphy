import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { GiphySearchService } from '../giphySearch.service';
import { ActiveSpinnerService } from '../activeSpinner.service';
import { Image } from '../model';
import { FavUpdateService } from '../favUpdate.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-image-panel',
  templateUrl: './image-panel.component.html',
  styleUrls: ['./image-panel.component.css']
})
export class ImagePanelComponent implements OnInit {

  allGiphies = [];
  allResults = [];
  showSpinner: boolean;

  userEmail: any

  p: number;

  image: Image = {
    email: '', imageId: ''
  };

  private sub: Subscription;
  private sub2: Subscription;

  constructor(private http: HttpClient, private giphySearchSvc: GiphySearchService,
              private favUpdateSvc: FavUpdateService, private activeSpinnerSvc: ActiveSpinnerService,
              private snackBar: MatSnackBar) { } // injection

  ngOnInit() {
    this.sub2 = this.activeSpinnerSvc.activeSpinner.subscribe
          ((value: boolean) => {
            this.showSpinner = value;
          });
    this.userEmail = JSON.parse(localStorage.getItem('token'));
          this.sub = this.giphySearchSvc.giphySearchEvent.subscribe(
            (data) => {
              console.log('>>>>> giphy search event: ', data);
              this.giphySearchSvc.getGiphys(data)
                .then(result => {
                  this.showSpinner = false;
                  this.allGiphies = result.data;
                  this.allResults = result;
                  console.log('>>>> images: ', this.allGiphies);
                });
            });
  }

  addToList(i: string): void {
    console.log('>>>>>> image id: ', i);
    this.userEmail = JSON.parse(localStorage.getItem('token'));
    this.image.email = this.userEmail;
    this.image.imageId = i;
    console.log('>>>>>> image email: ', this.image.email);
    console.log('>>>>>> image id: ', this.image.imageId);
    this.favUpdateSvc.addNewFav(this.image).then(() => {
      this.snackBar.open('You have favourited a Giphy!', 'OK',
        {duration: 5000,}
        );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

}

