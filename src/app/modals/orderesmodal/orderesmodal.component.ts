import { FormattedError } from '@angular/compiler';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/BackEnd/Services/order.service';
import { SignalRService } from 'src/app/BackEnd/Services/signal-rservice.service';
import { ICategory } from 'src/app/BackEnd/ViewModels/icategory';
import { IOrderDetails } from 'src/app/BackEnd/ViewModels/iorder-details';
import { IOrderModel } from 'src/app/BackEnd/ViewModels/iorder-model';
import { IProduct } from 'src/app/BackEnd/ViewModels/iproduct';
import { OrderStatus } from 'src/app/BackEnd/ViewModels/order-status.enum';
import { OrderType } from 'src/app/BackEnd/ViewModels/order-type.enum';

// import { DialogData } from 'src/app/purchases/purchases.component';
// import { DialogData } from 'src/app/home/home.component';

@Component({
  selector: 'app-orderesmodal',
  templateUrl: './orderesmodal.component.html',
  styleUrls: ['./orderesmodal.component.scss']
})
export class OrderesmodalComponent implements OnInit {

  // //#region 
  // signalrfunc(){
  //   var order: IOrderModel = {
  //     order_id: 120202, order_date: new Date(), orderType: OrderType.Delivery, addressClient: 'asdasdasdasd',
  //     nameClient: "signalr", notes: "mmessage from signalr", orderDetailsModels: [], orderStatus: OrderStatus.Cancel, phoneClient: '0120232323',
  //     totalPrice: 1020302, username: "signalr"
  //   };
  //   this.signalr.broadcastParams(order);

  // }
  // //#endregion

  message = false;
  

  //#region 

  TitleOrder: string = "إضافه طلب";

  orderObject: IOrderModel = {
    order_id: 0, order_date: new Date(), orderType: OrderType.Delivery,
    orderStatus: OrderStatus.Wait, addressClient: '', nameClient: '', notes: "", phoneClient: '', username: 'tony', totalPrice: 0, orderDetailsModels: []
  }

  pro_id: number = 0;
  quantity_meal: number = 1;

  filterProduct: number = 0;

  CategoryLst: ICategory[] = []

  ProductLst: IProduct[] = []

  typeOperation: string = "تسجيل الطلب";

  //#endregion


  constructor(public dialogRef: MatDialogRef<OrderesmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderServices: OrderService,
    private router: Router,
    private signalr: SignalRService) { }

  ngOnInit(): void {
    if (this.data.typePage == "Edit") {
      this.orderServices.getOneOrder(this.data.id).subscribe((data) => {
        this.orderObject = data;
      })
      this.typeOperation = "تعديل الطلب";
      this.TitleOrder = "تعديل الطلب";

    }
    this.orderServices.getCategory().subscribe((dataC) => {
      this.CategoryLst = dataC || [];
    });
    this.orderServices.getProduct().subscribe((datap) => {
      console.log(datap);
      this.ProductLst = datap || [];
    });
    console.log(this.filterProduct);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }



  //#region  use services method and connetionto api 

  //#region post to post data for api
  addOrder(orderForm) {
    if (orderForm.form.valid) {
      if (this.data.typePage == "Edit") {
        console.log("Edit");
        this.updateOrder(this.data.id);
        console.log(this.orderObject)
        this.orderServices.updateOrder(this.orderObject.order_id, this.orderObject);
        this.message = true;
      }
      else if (this.data.typePage == "Add") {
        this.addNewOrder();

      }
    }
  }

  AddDetailsOrder() {
    if (this.data.typePage == "Edit") {
      this.addDetailsOrderInData(this.data.id);
      this.orderServices.updateOrder(this.orderObject.order_id, this.orderObject);

    }
    else if (this.data.typePage == "Add") {
      this.adddetailsOrderInM();
    }
  }

  
  RemoveItem(product: any) {
    if(this.orderObject.orderDetailsModels.length>1){
    if (this.data.typePage == "Edit") {
      this.removeDetailsOrderInData(this.data.id, product.product_id)
      this.orderServices.updateOrder(this.orderObject.order_id, this.orderObject);

    }
    else if (this.data.typePage == "Add") {
      this.RemoveDetails(product);
    }
  }
  }

  //#endregion 


  //#endregion 



  //#region  api for update order and details page Edit

  updateOrder(id: number) {
    if (this.orderObject.nameClient != '' || this.orderObject.addressClient != '' || this.orderObject.phoneClient.length == 11,
      this.orderObject.orderDetailsModels.length >= 0) {
      this.orderServices.updateOrder(id, this.orderObject).subscribe((data) => {
        console.log(data);
        console.log("update updateupdateupdateupdateupdateupdateupdateupdate");
        location.reload();
        this.onNoClick();

      }, (error) => {
        console.log(error);
      })
    }
  }

  addDetailsOrderInData(id: number) {
    if (this.orderObject.nameClient != '' || this.orderObject.addressClient != '' || this.orderObject.phoneClient.length == 11,
      this.orderObject.orderDetailsModels.length >= 0) {
      let body = this.adddetailsOrderInM()
      this.orderServices.addDetailsOrder(id, body).subscribe((data) => {
        this.orderServices.getOneOrder(this.orderObject.order_id).subscribe((data)=>{
          this.orderObject = data;
        });
        this.orderServices.updateOrder(this.orderObject.order_id, this.orderObject);
        console.log(data);
      }, (error) => {
        console.log(error);
      })
    }
  }

  removeDetailsOrderInData(id: number, idProduct: number) {
    if (this.orderObject.orderDetailsModels.length > 1) {
      this.orderServices.removeDetailsOrder(id, idProduct).subscribe((data) => {
        this.RemoveDetails(this.ProductLst.find(i=>i.product_id==idProduct));
        this.orderServices.getOneOrder(this.orderObject.order_id).subscribe((data)=>{
          this.orderObject = data;
        });
        this.orderServices.updateOrder(this.orderObject.order_id, this.orderObject);
      }, (error) => {
        if(error.status==200)
        {
          console.log(error.status)
        this.RemoveDetails(this.ProductLst.find(i=>i.product_id==idProduct));
        this.orderServices.getOneOrder(this.orderObject.order_id).subscribe((data)=>{
          this.orderObject = data;
        });

          this.orderServices.updateOrder(this.orderObject.order_id, this.orderObject);
        }
        console.log(error);
      })
      this.orderServices.updateOrder(this.orderObject.order_id, this.orderObject);

    }
  }

  //#endregion



  //#region  deal with new order to add new order Page Add

  addNewOrder() {
    if (this.orderObject.nameClient != '' || this.orderObject.addressClient != '' || this.orderObject.phoneClient.length == 11,
      this.orderObject.orderDetailsModels.length > 0) {

      this.orderServices.addOrder(this.orderObject).subscribe((data) => {
        console.log(data)
        this.SendNewOrder(data);
        location.reload();
        this.onNoClick();

      }, (error) => {
        console.log(error);
      })
    }
  }
  RemoveDetails(product) {
    if (this.orderObject.orderDetailsModels.length > 1) {
      this.orderObject.orderDetailsModels.forEach(ele => {
        if (ele.product_id.toString() == product.product_id.toString()) {
          if (this.orderObject.totalPrice <= 0) { this.orderObject.totalPrice = 0; }
          else {
            this.orderObject.totalPrice -= ele.priceMeal;
            this.orderObject.orderDetailsModels =
              this.orderObject.orderDetailsModels.filter(item => item.product_id != product.product_id);
              this.orderServices.updateOrder(this.orderObject.order_id, this.orderObject);

          }
        }
      });
    }
  }
  SendNewOrder(Order: IOrderModel) {
    console.log("send")
    console.log(Order);
    this.orderServices.sendNewOrder(Order);
  }

  //#region add details in new order



  adddetailsOrderInM() {
    console.log(this.pro_id);
    if (this.pro_id > 0) {
      let product = this.ProductLst.find(p => p.product_id == this.pro_id);
      let id = product.product_id;
      let name = product.product_name;
      let quantity = this.quantity_meal;
      let price = this.quantity_meal * product.product_price;
      let newObject = new IOrderDetails(id, name, quantity, price, '');
      console.log(newObject);
      let flag = true;
      this.orderObject.orderDetailsModels.forEach(ele => {
        if (ele.product_id.toString() == this.pro_id.toString()) {
          ele.priceMeal += product.product_price * quantity;
          ele.quantityMeal += quantity;
          this.orderObject.totalPrice += product.product_price * quantity;
          console.log(this.orderObject)
          // this.orderServices.updateOrder(this.orderObject.order_id, this.orderObject);
          console.log(this.orderObject);
          flag = false;
        }
      })
      if (flag) {
        this.orderObject.orderDetailsModels.push(newObject);
        this.orderObject.totalPrice += price;
      }

      return newObject;
    }
  }
  //#endregion

  //#endregion




  //#region rubbish
  getProductForCat() {
    console.log(this.filterProduct);
    console.log(this.pro_id);
  }
  //#endregion

  // function to allow number only
  phkeyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  //function to prevent numbers
  keyPress(event: any) {
    const pattern = /^[\u0621-\u064A\a-zA-Z \-\']+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
