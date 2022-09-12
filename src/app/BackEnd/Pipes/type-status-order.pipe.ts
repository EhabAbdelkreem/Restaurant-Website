import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../ViewModels/order-status.enum';
import { OrderType } from '../ViewModels/order-type.enum';

@Pipe({
  name: 'typeStatusOrder'
})
export class TypeStatusOrderPipe implements PipeTransform {

  transform(value: OrderStatus|OrderType,arg:any):unknown {
    if(arg=="status"){
      switch(value)
      {
        case OrderStatus.Wait.toString():
          return "انتظار";
        case OrderStatus.Ok.toString():
          return "تم التسليم";
        case OrderStatus.Cancel.toString():
          return "طلب مرفوض";
      }
    }
    else if(arg=="type"){
      switch(value)
      {
        case OrderType.Delivery.toString():
          return "دليفرى";
        case OrderType.Restaurant.toString():
          return "المطعم";
          case OrderType.Online.toString():
            return "اونلاين";
      }
    }
  }
}
