import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GlobalVariable } from 'src/app/BackEnd/Global/global-variable';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  headers = GlobalVariable.headerWithAuth();

  options = { headers: this.headers }
  GetAllProducts(){
    return this.http.get(environment.baseApi+'/Products',this.options)
  }
  GetAllCategries(){
    return this.http.get(environment.baseApi+'/Categories',this.options)

  }
  GetProductbyCategry(keyword:string){
    return this.http.get(environment.baseApi+'/Products/productCatId/'+keyword,this.options)

  }

  GetProductById(id:any){
    return this.http.get(environment.baseApi+'/Products/'+id,this.options)
  }
}
