import {Component, OnInit} from '@angular/core';
import {ImageListService} from '../imageList.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Image} from '../model';
import {FavUpdateService} from '../favUpdate.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  imagesList: any[] = [];
  userEmail: any;
  checkLoginUser = false;

  image: Image = {
    email: '', imageId: ''
  };

  p: number;

  constructor(private http: HttpClient, private imageListSvc: ImageListService, private favUpdateSvc: FavUpdateService,
              private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.userEmail = JSON.parse(localStorage.getItem('token'));
    if (this.userEmail != null) {
      if (this.userEmail.toString() === this.activatedRoute.snapshot.params.userEmail.toString()) {
        this.checkLoginUser = true;
      } else {
        this.checkLoginUser = false;
      }
    }console.log('>>>> check login user = favList user: ', this.checkLoginUser)

        this.imageListSvc.getImagelist(this.userEmail)
          .then(result => {
            this.imagesList = result;
            console.log('>>>> images list: ', result);
          });
  }

  deleteFromList(i: string): void {
    this.userEmail = JSON.parse(localStorage.getItem('token'));
    this.image.email = this.userEmail;
    this.image.imageId = i;
    this.favUpdateSvc.deleteFav(this.image);
    location.reload();
  }

}
