import { Injectable } from '@angular/core';
import { IOrderModel } from '../ViewModels/iorder-model';
import { OrderStatus } from '../ViewModels/order-status.enum';
import { OrderType } from '../ViewModels/order-type.enum';

@Injectable({
  providedIn: 'root'
})
export class CartServicesService {

  constructor() { }



  CreateNewCart():IOrderModel{
    return {order_id: 0, order_date: new Date(), orderType: OrderType.Delivery,orderStatus: OrderStatus.Wait, addressClient: '', nameClient: '', notes: "", phoneClient: '', username: 'tony', totalPrice: 0, orderDetailsModels: []};
  }

  AddInfoOrderAndClient(){
    

  }

  AddProductToCart(){}

  RemoveProductFromCart(){}

  SaveCartInData(){}

}
