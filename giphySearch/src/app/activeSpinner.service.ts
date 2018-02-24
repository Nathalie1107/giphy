import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ActiveSpinnerService {
  public activeSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
