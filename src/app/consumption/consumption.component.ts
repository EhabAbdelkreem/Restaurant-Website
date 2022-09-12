import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConsumService } from '../BackEnd/Services/consum.service';
import { ExpensesModel } from '../BackEnd/ViewModels/expenses-model';
import { ConsumptionmodalComponent } from '../modals/consumptionmodal/consumptionmodal.component';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit {
  dialogRef: MatDialogRef<any>;
  constructor(public dialog: MatDialog,
    private consumServices: ConsumService,
    private router:Router) { }

  //#region 
  ConsumLst: ExpensesModel[] ;

  //#endregion

  //#region 
  openDialog(type: any, typePage: any): void {
    if (typePage == "Add") {
      this.dialogRef = this.dialog.open(ConsumptionmodalComponent, {
        width: '50%',
        height: '80%',
        data: { id: 0, typePage: "Add" }//{ date: this.date,item:this.item,quantity:this.quantity,price:this.price},
      });
    }
    else if (typePage == "Edit") {
      this.dialogRef = this.dialog.open(ConsumptionmodalComponent, {
        width: '50%',
        height: '80%',
        data: { id: type, typePage: "Edit" }//{ date: this.date,item:this.item,quantity:this.quantity,price:this.price},
      });
    }
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.total = result;
    });
  }

  //#endregion

  //#region 
  ngOnInit(): void {
    //    this.dialogRef.updateSize('80%', '80%');
    this.recevieNewOrder();
    this.getAllConsumption();
  }

  //#endregion


  //#region  http services
  getAllConsumption(){
    this.consumServices.getAllConsum().subscribe((data)=>{
      console.log("get all consum");
      this.ConsumLst = data;
      console.log(data);
    })
  }


  deleteOneConsumInD(id:number){
    if (confirm("هل تريد حذف هذه الفاتوره بالفعل؟؟"))
    this.consumServices.deleteOneConsum(id).subscribe(()=>{
      this.ConsumLst=this.ConsumLst.filter(cl=>cl.bill_id !=id);
    },
    (error)=>{
      console.log(error);
    });
    console.log(id);
  }
  //#endregion

  //#region  receive message
  recevieNewOrder() {
    this.consumServices.recevieNewConsum().subscribe((newConsum) => {
      console.log("Res")
      console.log(newConsum);
      if (newConsum != null) {
        this.ConsumLst.push(newConsum);
      }
    });
  }
  //#endregion
}
