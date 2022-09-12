import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http'
import { PurchasesService } from '../BackEnd/Services/purchases.service';
import { PurchasesModel } from '../BackEnd/ViewModels/purchases-model';
import { BillType } from '../BackEnd/ViewModels/bill-type.enum';
import { Items } from '../BackEnd/ViewModels/items';
import { map } from 'rxjs/internal/operators/map';
import { PurchasesDetailsModel } from '../BackEnd/ViewModels/purchases-details-model';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {

  //#region properties

  TitlePurchases: string = "إضافه مشتريات";

  PurchasesObject: PurchasesModel = { bill_id: 0, bill_date: new Date(), totalPrice: 0, vendorName: '', type: BillType.Buy.toString(), purchasesSalesDetailsModels: [] };

  PurchasesDetailsQuantity: number = 1;
  PurchasesDetailsPrice: number = 0;

  ItemsLst?: Items[] = [];

  itemId?: number = 0;

  typeOperation?: string = "اضافة فاتورة";

  //#endregion

  //#region  constructor inject
  constructor(public dialogRef: MatDialogRef<AddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private PurchasesServices: PurchasesService) { }
  //#endregion


  //#region  implementation cycle
  ngOnInit(): void {
    if (this.data.typePage == "Edit") {
      this.typeOperation = "تعديل مشتريات";
      this.TitlePurchases = "تعديل فاتورة ";
      this.PurchasesServices.getOnePurchases(this.data.id).subscribe((dataBill) => {
        this.PurchasesObject = dataBill;
      }, (error) => console.log(error))

    }
    this.getAllItems();
  }

  //#endregion


  //#region  function to close Dialog
  onNoClick(): void {
    this.dialogRef.close();
  }
  //#endregion


  //#region data from api another entity not Purchases
  getAllItems() {
    this.PurchasesServices.getAllItems().subscribe((data) => {
      this.ItemsLst = data;
    }, (error) => map(error => console.log(error)))
  }
  //#endregion


  //#region  function add in memory or database
  addBill(purchases: any) {
    console.log(purchases.form.valid);
    if (this.PurchasesObject.purchasesSalesDetailsModels.length > 0 &&
      this.PurchasesObject.totalPrice > 0 && this.PurchasesObject.vendorName != '' && purchases.form.valid) {
      if (this.data.typePage == "Edit") {
        this.updateBill(this.data.id);
        console.log("data Edit");
      }
      else if (this.data.typePage == "Add") {
        console.log("memory Add");
        this.addNewBillInM();
      }
    }
  }


  addItemsInBill() {
    if (this.itemId > 0) {
      if (this.data.typePage == "Edit") {
        if (this.itemId > 0 && this.PurchasesDetailsQuantity > 0
          && this.PurchasesDetailsPrice > 0
          && this.PurchasesObject.vendorName != '') {
          this.addDetailsBillInData(this.data.id);
          console.log("memory  edit");
        }
      }
      else if (this.data.typePage == "Add") {
        if (this.itemId > 0 && this.PurchasesDetailsQuantity > 0
          && this.PurchasesDetailsPrice > 0
          && this.PurchasesObject.vendorName != '') {
          this.addDetailsInM();
          console.log("memory add");
        }
      }
    }
  }


  RemoveItemsFromBill(item: any) {
    if (this.data.typePage == "Edit") {
      if (this.PurchasesObject.purchasesSalesDetailsModels.length > 1) {
        this.RemoveDetailsInM(item);
        this.removeDetailsBillInData(this.data.id, item.item_id)
        console.log("data dit");
      }
    }
    else if (this.data.typePage == "Add") {
      if (this.PurchasesObject.purchasesSalesDetailsModels.length > 1) {

        this.RemoveDetailsInM(item);
        console.log("memory add");
      }
    }
  }
  //#endregion

  //#region  function for deal with memory to save new bill
  addNewBillInM() {
    if (this.PurchasesObject.purchasesSalesDetailsModels.length >= 1 &&
      this.PurchasesObject.totalPrice > 0 && this.PurchasesObject.vendorName.length > 3) {
      this.PurchasesServices.addNewPurchasesBill(this.PurchasesObject).subscribe((data) => {
        console.log(data)
        console.log("added");
        this.SendNewPurchases(data);
        this.onNoClick();
      }, (error) => {
        console.log(error);
        this.onNoClick();
      })
    }
  }


  RemoveDetailsInM(item: any) {
    console.log(item);
    console.log(item.item_id);
    this.PurchasesObject.purchasesSalesDetailsModels.forEach(ele => {
      console.log(ele.item_id.toString() == item.item_id.toString())
      if (ele?.item_id.toString() == item?.item_id?.toString()) {
        this.PurchasesObject.totalPrice -= ele.price;
        this.PurchasesObject.purchasesSalesDetailsModels =
          this.PurchasesObject.purchasesSalesDetailsModels.filter(ite => ite.item_id != item.item_id);
        //this.PurchasesServices.updateBill(this.PurchasesObject.bill_id, this.PurchasesObject);
      }
    });




  }


  addDetailsInM() {
    console.log(this.itemId);
    if (this.itemId > 0 && this.PurchasesDetailsQuantity > 0
      && this.PurchasesDetailsPrice > 0
      && this.PurchasesObject.vendorName != '') {
      let item = this.ItemsLst.find(i => i.id == this.itemId);
      let id = item.id;
      let name = item.name;
      let quantity = this.PurchasesDetailsQuantity;
      let price = this.PurchasesDetailsPrice;
      let newObject = new PurchasesDetailsModel(id, name, quantity, price);
      console.log(newObject);
      let flag = true;
      this.PurchasesObject.purchasesSalesDetailsModels.forEach(ele => {
        if (ele.item_id.toString() == this.itemId.toString()) {
          ele.quantity += quantity;
          ele.price += price;
          this.PurchasesObject.totalPrice += price * quantity;
          //  this.PurchasesServices.updateBill(this.PurchasesObject.bill_id, this.PurchasesObject);
          flag = false;
        }
      })
      if (flag) {
        this.PurchasesObject.purchasesSalesDetailsModels.push(newObject);
        this.PurchasesObject.totalPrice += price * quantity;

      }

      return newObject;
    }
  }
  //#endregion


  //#region  api for update order and details page Edit

  updateBill(id: number) {
    if (this.PurchasesObject.purchasesSalesDetailsModels.length >= 0) {
      this.PurchasesServices.updateBill(id, this.PurchasesObject).subscribe((data) => {
        console.log(data);
        location.reload();
        this.onNoClick();
      }, (error) => {
        console.log(error);
      })
    }
  }

  addDetailsBillInData(id: number) {
    if (this.PurchasesObject.purchasesSalesDetailsModels?.length >= 0) {
      let body = this.addDetailsInM()
      this.PurchasesServices.addDetailsBill(id, body).subscribe((data) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      })
    }
  }

  removeDetailsBillInData(idBill: number, idItem: number) {
    if (this.PurchasesObject.purchasesSalesDetailsModels.length > 0) {
      this.PurchasesServices.removeDetailsBill(idBill, idItem).subscribe((data) => {
        console.log("Deleted")
        console.log(data);
      }, (error) => {
        console.log(error);
      })
    }
  }

  //#endregion


  //#region  sender for new bill
  SendNewPurchases(bill: PurchasesModel) {
    console.log("send")
    console.log(bill);
    this.PurchasesServices.sendNewPurchases(bill);
  }
  //#endregion

  keyPress(event: any) {
    const pattern = /^[\u0621-\u064A\a-zA-Z \-\']+$/;
    let inputChar = String.fromCharCode(event.charCode);
       if (!pattern.test(inputChar)) {
           event.preventDefault();
      }
 }

}
