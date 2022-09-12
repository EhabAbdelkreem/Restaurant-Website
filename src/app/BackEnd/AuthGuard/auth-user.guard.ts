import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService } from '../Services/auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanLoad {
  constructor(private authUser:AuthUserService){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authUser.IsLoggin();
  }
}
