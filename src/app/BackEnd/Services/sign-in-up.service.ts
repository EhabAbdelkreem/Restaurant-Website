import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GlobalVariable } from '../Global/global-variable';
import { LoginModel } from '../ViewModels/login-model';
import { RegisterModel } from '../ViewModels/register-model';
import { AuthUserService } from './auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class SignInUpService {

  constructor(private http:HttpClient) { }

  options = { headers: GlobalVariable.headerWithNoAuth()};

  
  Login(user:any){
    return this.http.post(`${environment.urlApi}/Authintications/login`,user,{responseType:'text'}).pipe(catchError(error=>{
      return throwError(error);
    }))
  }


  Register(user:RegisterModel):Observable<RegisterModel>{
    return this.http.post<RegisterModel>(`${environment.urlApi}/Authintications/register`,user,this.options).pipe(catchError(error=>{
      return throwError(error);
    }))
  }
}
