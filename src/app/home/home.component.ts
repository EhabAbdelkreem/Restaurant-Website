import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { retry } from 'rxjs/internal/operators/retry';
import { OrderService } from '../BackEnd/Services/order.service';
import { IOrderModel } from '../BackEnd/ViewModels/iorder-model';
import { OrderType } from '../BackEnd/ViewModels/order-type.enum';
import { OrderdetailsmodalComponent } from '../modals/orderdetailsmodal/orderdetailsmodal.component';
import { OrderesmodalComponent } from '../modals/orderesmodal/orderesmodal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //#region
  OrderLst: IOrderModel[] = [];
  //#endregion

  dialogRef: MatDialogRef<any>;
  constructor(public dialog: MatDialog
    , private http: HttpClient,
    private orderServices: OrderService,
    private router: Router
  ) { }

  //#region  
  openDialog(type: any,typePage:any): void {
    if (typePage== "Add") {
      this.dialogRef = this.dialog.open(OrderesmodalComponent, {
        width: '70%',
        height: '100%',
        data: {id:type,typePage:"Add"}
      });
    }
    else if (typePage=="Edit"){
      this.dialogRef = this.dialog.open(OrderesmodalComponent, {
        width: '70%',
        height: '100%',
        data: {id:type,typePage:"Edit"}//{ date: this.date,item:this.item,quantity:this.quantity,price:this.price},
      });
    }
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  //#endregion


  ngOnInit(): void {
    this.getAllOrder()
    this.recevieNewOrder();

    //    this.dialogRef.updateSize('100%', '100%');
  }

  //#region 

  getAllOrder() {
    this.orderServices.GetAllOrderNotOnlineInDay().subscribe((data) => {
      console.log(data);
      this.OrderLst = data;
    });
  }
  recevieNewOrder() {
    this.orderServices.recevieNewOrder().subscribe((newOrder) => {
      console.log("Res")
      console.log(newOrder);
      if (newOrder != null) {
        this.OrderLst.push(newOrder);
      }
    });
  }
  changeTypeOrder(id: number, type: OrderType) {
    console.log(id, type);
    this.orderServices.changeTypeOrder(id, type).subscribe((data) => {
      this.OrderLst.find(o => o.order_id == id).orderStatus = data.orderStatus;
      document.getElementById(`orderStatus-${id}`).innerHTML = data.orderStatus == "Wait" ? 'انتظار' : data.orderStatus == "Ok" ? 'تم التسليم' : 'طلب مرفوض';
    });
  }
  //#endregion



  //#region  
  openDetails(orderId): void {
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


}

