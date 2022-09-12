import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddproductmodalComponent } from '../modals/addproductmodal/addproductmodal.component';
import { UpdateproductmodalComponent } from '../modals/updateproductmodal/updateproductmodal.component';
import { Products } from '../models/products';
import { ProductservicesService } from '../services/productservices.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  dialogRef: MatDialogRef <any> ;
  products:any;
  constructor(public dialog: MatDialog , private productservice:ProductservicesService) { }

  openDialog(): void {
    this.dialogRef = this.dialog.open( AddproductmodalComponent, {
      width: '70%',
      height:'60%',
      
    });
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogupdate(id:number,btype:string): void {
    this.dialogRef = this.dialog.open( UpdateproductmodalComponent, {
      width: '70%',
      height:'60%',
       data: { id:id,type:btype},
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.productservice.getAllproducts ().subscribe((d:Products[])=>{this.products=d;})
    });
  }



  ngOnInit(): void {
   this. getallproducts();
  }

  getallproducts(){
    this.productservice.getAllproducts ().subscribe((d:Products[])=>{this.products=d;})
  }

  Deleteproduct(id: number) {
    if (confirm(" هل تريد حذف هذا المنتج بالفعل؟؟"))
      this.productservice
        .deleteproducts(id)
        .subscribe(c => { this.getallproducts(); })
        window.location.reload();
  }

}
