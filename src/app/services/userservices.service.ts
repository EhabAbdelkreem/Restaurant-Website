import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { users } from '../models/users';
import { catchError } from 'rxjs/operators';
import { GlobalVariable } from '../BackEnd/Global/global-variable';

@Injectable({
  providedIn: 'root'
})


export class UserservicesService {
  private url="users";
  // errorHandler:any;
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

headers = GlobalVariable.headerWithAuth();

options = { headers: this.headers }

  constructor(private httpClient: HttpClient) { }

  getAllusers(): Observable<users[]> {
    return this.httpClient.get<users[]>(`${environment.ApiUrl}/${this.url}`,this.options)
    .pipe(catchError(this.errorHandler)
    )
  }

  getById(id): Observable<users> {
    return this.httpClient.get<users>(`${environment.ApiUrl}/${this.url}/${id}`,this.options)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  adduser(user:users): Observable<users> {
    return this.httpClient.post<users>(`${environment.ApiUrl}/${this.url}`,
    user,this.options)//this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  // updateusers(user): Observable<users> {
  //   return this.httpClient.put<users>(`${environment.ApiUrl}/${this.url}/${user.user_id}`, user, this.httpOptions)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  public updateusers(users:users):Observable<users>{
    return this. httpClient.put<users>(`${environment.ApiUrl}/${this.url}/${users.user_id}`,users,this.options)//,this.httpOptions)
    }

  deleteusers(id){
    return this.httpClient.delete<users>(`${environment.ApiUrl}/${this.url}/${id}`,this.options)//, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }



}
