import { EventEmitter, Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class GiphySearchService {

  giphySearchEvent = new EventEmitter<string>();

  constructor(private http: HttpClient) {
  }

  getGiphys(getGiphy: string): Promise<any> {
    const queryString = new HttpParams()
      .set('api_key', 'gKwgYR2zqYpB5ICuCKBptYUttVR6JmfW')
      .set('q', getGiphy)
      .set('limit', '1000')
      .set('offset', '0')
      .set('rating', 'G')
      .set('lang', 'en');

    // returning observable and convert to promise
    return (
      this.http.get('https://api.giphy.com/v1/gifs/search', {params: queryString})
        .take(1).toPromise()
        .then((result) => {
          return (result);
        })
    );
  }
}
