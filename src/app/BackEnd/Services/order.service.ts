import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { interval, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GlobalVariable } from '../Global/global-variable';
import { ICategory } from '../ViewModels/icategory';
import { IOrderDetails } from '../ViewModels/iorder-details';
import { IOrderModel } from '../ViewModels/iorder-model';
import { IProduct } from '../ViewModels/iproduct';
import { OrderType } from '../ViewModels/order-type.enum';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private subject = new Subject<IOrderModel>();

  sendNewOrder(newOrderAdded: IOrderModel) {
    this.subject.next(newOrderAdded);
  }
  recevieNewOrder() {
    return this.subject.asObservable();
  }



  constructor(private http: HttpClient,private router:Router) { }


  headers = GlobalVariable.headerWithAuth();

  options = { headers: this.headers }


  getOrderOnline():Observable<IOrderModel[]>{
    return this.http.get<IOrderModel[]>(`${environment.urlApi}/Orders/online`,this.options).pipe(catchError(error=>{
      return throwError(error.message)
    }))
  }


  addOrder(body: IOrderModel): Observable<IOrderModel> {
    console.log(`${environment.urlApi}/Orders`)
    console.log(body)
    return this.http.post<IOrderModel>(`${environment.urlApi}/Orders`, JSON.stringify(body), this.options).pipe(catchError((error) => {
      return throwError(error.message);
    }));
  }

  updateOrder(id: number, body: IOrderModel): Observable<IOrderModel> {
    console.log(`${environment.urlApi}/Orders.${id}`)
    console.log(body)
    return this.http.put<IOrderModel>(`${environment.urlApi}/Orders/${id}`, JSON.stringify(body), this.options).pipe(catchError((error) => {
      return throwError(error.message);
    }));
  }

  addDetailsOrder(id: number, body: IOrderDetails): Observable<IOrderDetails> {
    return this.http.post<IOrderDetails>(`${environment.urlApi}/Orders/AddOrderDetails/${id}`, body, this.options).pipe(catchError((error) => {
      return throwError(error.message);
    }));
  }
  removeDetailsOrder(idO: number, idP: number): Observable<IOrderDetails> {
    return this.http.delete<IOrderDetails>(`${environment.urlApi}/Orders/DeleteOrderDetails/${idO}/${idP}`, this.options).pipe(catchError((error) => {
      return throwError(error);
    }));
  }
  getOneOrder(id: number): Observable<IOrderModel> {
    return this.http.get<IOrderModel>(`${environment.urlApi}/Orders/${id}`, this.options).pipe(catchError((error) => {
      return throwError(error.message);
    }));
  }
  getCategory(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${environment.urlApi}/Categories`,this.options).pipe(catchError((error) => {
      return throwError(error.message);
    }));
  }
  getProduct(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.urlApi}/Products`,this.options).pipe(catchError((error) => {
      return throwError(error.message);
    }));
  }
  GetAllOrderNotOnlineInDay(): Observable<IOrderModel[]> {
    //http://localhost:24637/api/Orders

    return this.http.get<IOrderModel[]>(`${environment.urlApi}/Orders/GetAllOrderNotOnlineInDay`,this.options).pipe(catchError((error) => {
      return throwError(error.message);
    }));
  }


  GetAllOrder(): Observable<IOrderModel[]> {
    //http://localhost:24637/api/Orders

    return this.http.get<IOrderModel[]>(`${environment.urlApi}/Orders`,this.options).pipe(catchError((error) => {
      return throwError(error.message);
    }));
  }

  changeTypeOrder(id: number, type: OrderType): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/Orders/changeType/${id}/${type}`, JSON.stringify({ id, type }), this.options).pipe(catchError((error) => {
      return throwError(error.message);
    }));
  }
}
