import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GlobalVariable } from '../Global/global-variable';
import { ExpensesDetailsModel } from '../ViewModels/expenses-details-model';
import { ExpensesModel } from '../ViewModels/expenses-model';
import { Items } from '../ViewModels/items';


@Injectable({
  providedIn: 'root'
})
export class ConsumService {

  constructor(private http:HttpClient) { }

  private subject = new Subject<ExpensesModel>();

  sendNewConsum(newOrderAdded: ExpensesModel) {
    this.subject.next(newOrderAdded);
  }
  recevieNewConsum() {
    return this.subject.asObservable();
  }


  headers = GlobalVariable.headerWithAuth();

  options = { headers: this.headers }


  getAllConsum():Observable<ExpensesModel[]>{
    return this.http.get<ExpensesModel[]>(`${environment.urlApi}/Expenses`,this.options).pipe(catchError((error)=>{
         return throwError(error.message);
       }));
  }

  getAllItems():Observable<Items[]>{
    return this.http.get<Items[]>(`${environment.urlApi}/Items`,this.options).pipe(catchError((error)=>{
      return throwError(error.message);
    }));
  }

  addNewBill(newBill:ExpensesModel):Observable<any>{
    return this.http.post<any>(`${environment.urlApi}/Expenses`,newBill,this.options).pipe(catchError((error)=>{
      return throwError(error.message);
    }));
  }

  deleteOneConsum(id:number){
    return this.http.delete(`${environment.urlApi}/Expenses/${id}`, this.options).pipe(catchError((error)=>{
      return throwError(error.message)
    }));
  }

  updateBill(id:number,oldBill:ExpensesModel):Observable<any>{
    return this.http.put<any>(`${environment.urlApi}/Expenses/${id}`,oldBill,this.options).pipe(catchError((error)=>{
      return throwError(error.message);
    }));
  }

  addDetailsBill(id:number,body:ExpensesDetailsModel):Observable<any>{
    return this.http.post<any>(`${environment.urlApi}/Expenses/AddBillDetails/${id}`,body,this.options).pipe(catchError((error)=>{
      return throwError(error.message);
    }));
  }

  removeDetailsBill(idBill:number,idItem:number){
    return this.http.delete(`${environment.urlApi}/Expenses/DeleteBillDetails/${idBill}/${idItem}`, this.options).pipe(catchError((error)=>{
      return throwError(error.message);
    }));
  }

  getOneConsum(id:number):Observable<ExpensesModel>{
    return this.http.get<ExpensesModel>(`${environment.urlApi}/Expenses/${id}`,this.options).pipe(catchError((error)=>{
      return throwError(error.message);
    }));
  }
}
