import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchPanelComponent } from './components/search-panel.component';
import { ImagePanelComponent } from './components/image-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { GiphySearchService } from './giphySearch.service';
import { ImageListComponent } from './components/image-list.component';
import { ImageListService } from './imageList.service';
import { UserBarComponent } from './components/user-bar.component';
import { ActiveSpinnerService } from './activeSpinner.service';
import { FavUpdateService } from './favUpdate.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const ROUTES: Routes = [
  { path: 'imageSearch', component: SearchPanelComponent},
  { path: 'images/:userEmail', component: ImageListComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    SearchPanelComponent,
    ImagePanelComponent,
    ImageListComponent,
    UserBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    RouterModule.forRoot(ROUTES, {useHash: true})
  ],
  providers: [
    GiphySearchService,
    ImageListService,
    ActiveSpinnerService,
    FavUpdateService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
