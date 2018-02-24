import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GiphySearchService } from '../giphySearch.service';
import { ActiveSpinnerService } from '../activeSpinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnInit {

  @ViewChild('searchForm') searchForm: NgForm;

  userEmail: any;

  // injection
  constructor(private giphySvc: GiphySearchService, private activeSpinnerSvc: ActiveSpinnerService, private router: Router) { }

  ngOnInit() {
  }

  findGiphys() {
    this.giphySvc.giphySearchEvent.next(this.searchForm.value.imageQuery);
    this.userEmail = JSON.parse(localStorage.getItem('token'));
    this.activeSpinnerSvc.activeSpinner.next(true);
  }
}
