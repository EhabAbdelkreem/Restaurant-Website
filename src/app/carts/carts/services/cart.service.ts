import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private subject = new Subject<any>();

  sendDataToPersonalCom(data: any) {
    this.subject.next(data);
  }
  recvDataToPersonalCom() {
    return this.subject.asObservable();
  }
  constructor() { }
}
