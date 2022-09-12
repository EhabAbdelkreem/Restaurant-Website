import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtParserService } from '../Global/jwt-parser.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private route: Router,private jwtParser:JwtParserService) {}

  Login(Token: any) {
    localStorage.setItem("AuthUserToken", Token);
    this.route.navigate(['admin']);
  }
  LogOut() {
    localStorage.removeItem("AuthUserToken");
    this.route.navigate(['signInOut']);
  }
  IsLoggin() {
    if (localStorage.getItem("AuthUserToken") !=null) {
      return true;
    }
    else {
      this.LogOut();
      return false;
    }
  }
}

