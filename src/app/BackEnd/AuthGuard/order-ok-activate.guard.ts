import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OkOrderService } from '../Services/ok-order.service';

@Injectable({
  providedIn: 'root'
})
export class OrderOkActivateGuard implements CanActivate {
  constructor(private okOrder:OkOrderService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log( this.okOrder.canOkOrder());
      return this.okOrder.canOkOrder();
    }
  
}
