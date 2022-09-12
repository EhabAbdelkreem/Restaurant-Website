import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Command, Window } from 'selenium-webdriver';
import { Items } from '../shared/items.model';
import { ItemsService } from '../shared/items.service';

import { Location, LocationStrategy, PathLocationStrategy} from "@angular/common";
// import { NotificationService } from 'app/service/notification.service'


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(public serviceItems:ItemsService , private router:Router , private rout:ActivatedRoute) { }

  ngOnInit() : void {
    this.serviceItems.getItems().subscribe(data =>{
       this.serviceItems.listItems=data;
    });
  }
  onSubmit(myform:NgForm){
   if (this.serviceItems.ItemsData.id == 0) {
    this.insertitem(myform);
    this.serviceItems.getItems();
  
    this.ngOnInit();
   
  
   } else {
    this.updatitemrecord(myform);
    this.serviceItems.getItems();
    this.ngOnInit();
   }
 
  
  }


  insertitem(myform:NgForm)
  {
    this.serviceItems.saveItems().subscribe( 
      res=>{
        console.log(res);
        
             this.restform(myform);
    },
    err=>{
      console.log(err);
    }
    )
    window.location.reload();
  }


  updatitemrecord(myform:NgForm)
  {
    this.serviceItems.updateItemservice().subscribe( 
      res=>{
             this.restform(myform);
    },
    err=>{
      console.log(err);
    }
    )
    window.location.reload();
  }


  restform(myform:NgForm)
  {
    myform.form.reset();
    this.serviceItems.ItemsData=new Items();
  }
   
  updatitem(selcteditem:Items){
    this.serviceItems.ItemsData= Object.assign({},selcteditem) ;
 

  }


  deletitem(id:number){
    if (confirm('هل انت متاكد من حزف المنتج؟')) {
    this.serviceItems.deletItems(id).subscribe(
      res=>{
                this.serviceItems.getItems();
    },
    err =>{
      console.log(err);
    })

  }
  this.ngOnInit();
  window.location.reload();
}


keyPress(event: any) {
  const pattern = /^[\u0621-\u064A\a-zA-Z \-\']+$/;
  let inputChar = String.fromCharCode(event.charCode);
     if (!pattern.test(inputChar)) {
         event.preventDefault();
    }
}



}
