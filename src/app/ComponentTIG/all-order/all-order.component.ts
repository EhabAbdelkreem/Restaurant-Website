import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/BackEnd/Services/order.service';
import { IOrderModel } from 'src/app/BackEnd/ViewModels/iorder-model';
import { OrderdetailsmodalComponent } from 'src/app/modals/orderdetailsmodal/orderdetailsmodal.component';

@Component({
  selector: 'app-all-order',
  templateUrl: './all-order.component.html',
  styleUrls: ['./all-order.component.scss']
})
export class AllOrderComponent implements OnInit {

  OrderLst:IOrderModel[]=[];

  dialogRef: MatDialogRef<any>;
  constructor(public dialog: MatDialog,
    private orderServices: OrderService,
    private router: Router,
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
  ngOnInit(): void {
    this.getAllOrder();

  }


  getAllOrder() {
    this.orderServices.GetAllOrder().subscribe((data) => {
      console.log(data);
        this.OrderLst = data;
    });
  }
}
