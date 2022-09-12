import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GlobalVariable } from '../Global/global-variable';
import { Items } from '../ViewModels/items';
import { PurchasesDetailsModel } from '../ViewModels/purchases-details-model';
import { PurchasesModel } from '../ViewModels/purchases-model';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  private subject = new Subject<PurchasesModel>();

  sendNewPurchases(newPurchasesAdded: PurchasesModel) {
    this.subject.next(newPurchasesAdded);
  }
  recevieNewPurchases() {
    return this.subject.asObservable();
  }

  constructor(private http: HttpClient) { }

  headers = GlobalVariable.headerWithAuth();
  options = { headers: this.headers }





  addNewPurchasesBill(body:PurchasesModel):Observable<PurchasesModel>{
    return this.http.post<PurchasesModel>(`${environment.urlApi}/PurchasesSales`,body,this.options).pipe(catchError(error=>{
      return throwError(error.message);
    }));
  }



  addDetailsBill(id:number,body:PurchasesDetailsModel):Observable<any>{
    return this.http.post<any>(`${environment.urlApi}/PurchasesSales/AddBillDetails/${id}`,body,this.options).pipe(catchError((error)=>{
      return throwError(error.message);
    }));
  }

  removeDetailsBill(idBill:number,idItem:number){
    return this.http.delete(`${environment.urlApi}/PurchasesSales/DeleteBillDetails/${idBill}/${idItem}`, this.options).pipe(catchError((error)=>{
      return throwError(error.message);
    }));
  }

  
  updateBill(id:number,oldBill:PurchasesModel):Observable<PurchasesModel>{
    return this.http.put<PurchasesModel>(`${environment.urlApi}/PurchasesSales/${id}`,oldBill,this.options).pipe(catchError((error)=>{
      return throwError(error.message);
    }));
  }



  getAllPurchases():Observable<PurchasesModel[]>{
    return this.http.get<PurchasesModel[]>(`${environment.urlApi}/PurchasesSales`,this.options).pipe(catchError(error=>{
      return throwError(error);
    }));
  }

  deleteOnePurchases(id:number){
    return this.http.delete(`${environment.urlApi}/PurchasesSales/${id}`,this.options).pipe(catchError(error=>{
      return throwError(error);
    }));
  }

  getOnePurchases(id:number):Observable<PurchasesModel>{
    return this.http.get<PurchasesModel>(`${environment.urlApi}/PurchasesSales/${id}`,this.options).pipe(catchError(error=>{
      return throwError(error);
    }));
  }

  getAllItems():Observable<Items[]>{
    return this.http.get<Items[]>(`${environment.urlApi}/Items`,this.options).pipe(catchError((error)=>{
      return throwError(error.message);
    }));
  }

}
