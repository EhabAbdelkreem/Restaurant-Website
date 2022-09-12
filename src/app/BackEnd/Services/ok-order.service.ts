import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OkOrderService {

  constructor(private router: Router) { }
  canOkOrder() {
    console.log(localStorage.getItem('cart'));

    if (localStorage.getItem('cart')) {
      console.log('inside if')
      if (JSON.parse(localStorage.getItem('cart')).length > 0) {
      console.log('inside if if')

        return true;
      }
      else {
      console.log('inside if else')
        return this.router.navigate(['user', 'cart']);
      }
    }
    else {
      console.log('inside else')
      return this.router.navigate(['user', 'home']);
    }
  }
}
