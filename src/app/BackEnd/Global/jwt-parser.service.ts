import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class JwtParserService {
  jwtToken: string;
  decodedToken: { [key: string]: string }; 

  constructor() {
  }

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken() {
      if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
      }
    }
 
    getDecodeToken() {
      return jwt_decode(this.jwtToken);
    }
 
    getUsername() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.username : null;
    }
    getUserId() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.id : null;
    }
    getUserRole() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.Role : null;
    }
    getExpiryTime(){
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.exp : null;
    }
 
    isTokenExpired(): boolean {
      let expiryTime= Number(this.getExpiryTime());
      if (expiryTime) {
        return ((expiryTime) > (new Date()).getTime());
      } else {
        return false;
      }
    }
}
