import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { PurchasesService } from '../BackEnd/Services/purchases.service';
import { PurchasesModel } from '../BackEnd/ViewModels/purchases-model';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})

export class PurchasesComponent implements OnInit {


  //#region properties
  PurchasesLst: PurchasesModel[] = []
  //#endregion

  //#region  constructor for injection
  dialogRef: MatDialogRef<any>;
  constructor(public dialog: MatDialog,
    private PurchasesServices: PurchasesService) {

  }
  //#endregion

  //#region  implemention for cycle class
  ngOnInit(): void {
    this.recevieNewPurchases();
    this.getAllPurchasesption();
  }
  //#endregion



  //#region open dialog for add and edit data
  openDialog(id: any, typePage: any): void {
    if (typePage == "Add") {
      this.dialogRef = this.dialog.open(AddModalComponent, {
        width: '60%',
        height: '80%',
        data: { id: 0, typePage: "Add" }
      });
    }
    else if (typePage == "Edit") {
      this.dialogRef = this.dialog.open(AddModalComponent, {
        width: '60%',
        height: '80%',
        data: { id: id, typePage: "Edit" }
      });
    }

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.total = result;
    });
  }
  //#endregion


  //#region  http services
  getAllPurchasesption() {
    this.PurchasesServices.getAllPurchases().subscribe((data) => {
      console.log(data);
      this.PurchasesLst = data;
    })
  }


  deleteOnePurchasesInD(id: number) {
    if (confirm("هل تريد حذف هذه الفاتوره بالفعل؟؟"))
    this.PurchasesServices.deleteOnePurchases(id).subscribe(() => {
      this.PurchasesLst = this.PurchasesLst.filter(cl => cl.bill_id != id);
    },
      (error) => {
        console.log(error);
      });
  }
  //#endregion



  //#region  receive message
  recevieNewPurchases() {
    this.PurchasesServices.recevieNewPurchases().subscribe((newPurchases) => {
      console.log("Res")
      console.log(newPurchases);
      if (newPurchases != null) {
        this.PurchasesLst.push(newPurchases);
      }
    });
  }
  //#endregion


}

