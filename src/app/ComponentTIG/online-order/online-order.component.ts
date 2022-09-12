import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/BackEnd/Services/order.service';
import { SignalRService } from 'src/app/BackEnd/Services/signal-rservice.service';
import { IOrderModel } from 'src/app/BackEnd/ViewModels/iorder-model';
import { OrderType } from 'src/app/BackEnd/ViewModels/order-type.enum';
import { OrderdetailsmodalComponent } from 'src/app/modals/orderdetailsmodal/orderdetailsmodal.component';
import { OrderStatus } from 'src/app/BackEnd/ViewModels/order-status.enum';

@Component({
  selector: 'app-online-order',
  templateUrl: './online-order.component.html',
  styleUrls: ['./online-order.component.scss']
})
export class OnlineOrderComponent implements OnInit {


  OrderLst:IOrderModel[]=[];
  

  dialogRef: MatDialogRef<any>;
  constructor(public dialog: MatDialog,
    private orderServices: OrderService,
    private router: Router,
    private Signalr:SignalRService
  ) { }

 //#region 

  openDialog(orderId:number): void {
      this.dialogRef = this.dialog.open(OrderdetailsmodalComponent,{
        width: '50%',
        height: '100%',
        data: {id:orderId}
      });  
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }



 //#endregion


  ngOnInit(): void {
    this.getOnlineOrder();
    this.Signalr.data.subscribe((data)=>{
      console.log(data);
      console.log(data.order_id>0)
      if(data.order_id>0)
          {this.OrderLst.push(data);}
    });
  }

  //#region 

  getOnlineOrder() {
    this.orderServices.getOrderOnline().subscribe((data) => {
      console.log(data);
      if(data!=null)
      {this.OrderLst = data;}
    });
  }

  changeTypeOrder(id: number, type: OrderType) {
    
    console.log(id, type);
    this.orderServices.changeTypeOrder(id, type).subscribe((data) => {
      this.OrderLst.find(o => o.order_id == id).orderStatus = data.orderStatus;
      document.getElementById(`orderStatus-${id}`).innerHTML = data.orderStatus == "Wait" ? 'انتظار' : data.orderStatus == "Ok" ? 'تم التسليم' : 'طلب مرفوض';
    });
  }

}
