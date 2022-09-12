import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/BackEnd/Services/order.service';
import { IOrderModel } from 'src/app/BackEnd/ViewModels/iorder-model';
import { OrderStatus } from 'src/app/BackEnd/ViewModels/order-status.enum';
import { OrderType } from 'src/app/BackEnd/ViewModels/order-type.enum';
// import { DialogData } from 'src/app/purchases/purchases.component';

@Component({
  selector: 'app-orderdetailsmodal',
  templateUrl: './orderdetailsmodal.component.html',
  styleUrls: ['./orderdetailsmodal.component.scss']
})
export class OrderdetailsmodalComponent implements OnInit {

  orderDetails: IOrderModel = {
    order_id: 0, order_date: new Date(), orderType: OrderType.Delivery,
    orderStatus: OrderStatus.Wait, addressClient: '', nameClient: '', notes: "", phoneClient: '', username: 'tony', totalPrice: 0, orderDetailsModels: []
  }

  constructor(public dialogRef: MatDialogRef<OrderdetailsmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private orderServices:OrderService) { }

  ngOnInit(): void {
    if (this.data.id>0) {
      this.orderServices.getOneOrder(this.data.id).subscribe((dataOrder) => {
        this.orderDetails = dataOrder;
      }, (error) => console.log(error))

    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  

  printInvoice(){
    window.print();
  }
}
