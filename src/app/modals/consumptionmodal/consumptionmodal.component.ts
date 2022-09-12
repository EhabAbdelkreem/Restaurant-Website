import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { ConsumService } from 'src/app/BackEnd/Services/consum.service';
import { BillType } from 'src/app/BackEnd/ViewModels/bill-type.enum';
import { ExpensesDetailsModel } from 'src/app/BackEnd/ViewModels/expenses-details-model';
import { ExpensesModel } from 'src/app/BackEnd/ViewModels/expenses-model';
import { Items } from 'src/app/BackEnd/ViewModels/items';

//import { DialogData } from 'src/app/purchases/purchases.component';

@Component({
  selector: 'app-consumptionmodal',
  templateUrl: './consumptionmodal.component.html',
  styleUrls: ['./consumptionmodal.component.scss']
})
export class ConsumptionmodalComponent implements OnInit {

  //#region 
  ConsumBill?: ExpensesModel = { bill_id: 0, bill_date: new Date(new Date().getDate()), 
    type: BillType.Sell, expensesDetailsModels: [] };
  ConsumDetails?: ExpensesDetailsModel;
  ConsumDetailsQuantity: number = 1;
  ItemsLst?: Items[] = [];
  itemId?: number = 0;
  TitleConsum?: string = "اضافةأذن صرف";
  typeOperation?: string = "اضافة أذن";
  //#endregion

  //#region constructor and inject data
  constructor(public dialogRef: MatDialogRef<ConsumptionmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private consumServices: ConsumService) { }
  //#endregion

  maxQuantity=0;


  selectitem(){
    this.ConsumDetailsQuantity=1;
    this.maxQuantity = this.ItemsLst.find(i=>i.id==this.itemId).totalQuantity;
    console.log(this.maxQuantity);
  }


  //#region 
  ngOnInit(): void {
    if (this.data.typePage == "Edit") {
      this.typeOperation = "تعديل أذن";
      this.TitleConsum = "تعديل أذن صرف";
      this.consumServices.getOneConsum(this.data.id).subscribe((dataBill) => {
        console.log(dataBill)
        this.ConsumBill = dataBill;
        console.log(this.ConsumBill)
        console.log(this.ConsumBill.expensesDetailsModels)
      }, (error) => console.log(error))

    }
    this.getAllItems();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //#endregion


  //#region  function add in memory or database
  addBill(consumForm: any) {
    console.log(consumForm.form.valid);
    if (consumForm.form.valid) {
      if (this.data.typePage == "Edit") {
        this.updateBill(this.data.id);
      }
      else if (this.data.typePage == "Add") {
        this.addNewBillInM();
      }
    }
  }


  addItemsInBill() {
    if (this.itemId > 0) {
      if (this.data.typePage == "Edit") {
        this.addDetailsBillInData(this.data.id);
      }
      else if (this.data.typePage == "Add") {
        this.addDetailsInM();
      }
    }
  }


  RemoveItemsFromBill(item: any) {
    if (this.data.typePage == "Edit") {
      this.RemoveDetailsInM(item);
      this.removeDetailsBillInData(this.data.id, item.item_id)
    }
    else if (this.data.typePage == "Add") {
      this.RemoveDetailsInM(item);
    }
  }
  //#endregion

  //#region  function for deal with memory to save new bill
  addNewBillInM() {
    if (this.ConsumBill.expensesDetailsModels.length > 0) {
      this.consumServices.addNewBill(this.ConsumBill).subscribe((data) => {
        console.log(data)
        console.log("added");
        this.SendNewConsum(data);
        this.onNoClick();
      }, (error) => {
        console.log(error);
      })
    }
  }


  RemoveDetailsInM(item: any) {
    console.log(item);
    console.log(item.item_id);
    this.ConsumBill.expensesDetailsModels.forEach(ele => {
      console.log(ele.item_id.toString() == item.item_id.toString())
      if (ele?.item_id.toString() == item?.item_id?.toString()) {
        console.log(this.ConsumBill);
        this.ConsumBill.expensesDetailsModels =
          this.ConsumBill.expensesDetailsModels.filter(ite => ite.item_id != item.item_id);
        console.log(this.ConsumBill);
        this.consumServices.updateBill(this.ConsumBill.bill_id, this.ConsumBill);
      }
    });




  }


  addDetailsInM() {
    console.log(this.itemId);
    if (this.itemId > 0) {
      let item = this.ItemsLst.find(i => i.id == this.itemId);
      let id = item.id;
      let name = item.name;
      let quantity = this.ConsumDetailsQuantity;
      let newObject = new ExpensesDetailsModel(id, name, quantity);
      console.log(newObject);
      let flag = true;
      this.ConsumBill.expensesDetailsModels.forEach(ele => {
        if (ele.item_id.toString() == this.itemId.toString()) {
          ele.quantity += quantity;
          flag = false;
        }
      })
      if (flag) {
        this.ConsumBill.expensesDetailsModels.push(newObject);
      }

      return newObject;
    }
  }
  //#endregion


  //#region  api for update order and details page Edit

  updateBill(id: number) {
    if (this.ConsumBill.expensesDetailsModels.length >= 0) {
      this.consumServices.updateBill(id, this.ConsumBill).subscribe((data) => {
        console.log(data);
        location.reload();
        this.onNoClick();
      }, (error) => {
        console.log(error);
      })
    }
  }

  addDetailsBillInData(id: number) {
    if (this.ConsumBill.expensesDetailsModels?.length >= 0) {
      let body = this.addDetailsInM()
      this.consumServices.addDetailsBill(id, body).subscribe((data) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      })
    }
  }

  removeDetailsBillInData(idBill: number, idItem: number) {
    if (this.ConsumBill.expensesDetailsModels.length > 0) {
      this.consumServices.removeDetailsBill(idBill, idItem).subscribe((data) => {
        console.log("Deleted")
        console.log(data);
      }, (error) => {
        console.log(error);
      })
    }
  }

  //#endregion




  //#region  sender for new bill
  SendNewConsum(bill: ExpensesModel) {
    console.log("send")
    console.log(bill);
    this.consumServices.sendNewConsum(bill);
  }
  //#endregion

  //#region 
  getAllItems() {
    this.consumServices.getAllItems().subscribe((data) => {
      this.ItemsLst = data;
      console.log(data);
    }, (error) => map(error => console.log(error)))
  }
  //#endregion

}
