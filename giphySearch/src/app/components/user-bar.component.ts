import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ImageListService} from '../imageList.service';
import {Router} from '@angular/router';
import {GiphySearchService} from '../giphySearch.service';
import {ActiveSpinnerService} from '../activeSpinner.service';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent implements OnInit {

  @ViewChild('registerForm') registerForm: NgForm

  userEmail: any;

  constructor(private router: Router,
              private imageListSvc: ImageListService, private giphySearchSvc: GiphySearchService,
              private activeSpinnerSvc: ActiveSpinnerService) { }

  ngOnInit() {
    this.userEmail = JSON.parse(localStorage.getItem('token'));
    if (this.userEmail != null) {
      this.imageListSvc.imageListEvent.next(this.userEmail);
      this.giphySearchSvc.giphySearchEvent.next('');
    }
  }

  login() {
    localStorage.setItem('token', JSON.stringify(this.registerForm.value.emailEntry));
    this.userEmail = JSON.parse(localStorage.getItem('token'));
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.clear();
    this.userEmail = '';
    this.imageListSvc.imageListEvent.next(this.userEmail);
    this.router.navigate(['/']);

  }

  listFav() {
    this.userEmail = JSON.parse(localStorage.getItem('token'));
    this.router.navigate(['/images', this.userEmail]);
  }

  loadSearch() {
    this.router.navigate(['/imageSearch']);
    this.activeSpinnerSvc.activeSpinner.next(false);
  }
}
