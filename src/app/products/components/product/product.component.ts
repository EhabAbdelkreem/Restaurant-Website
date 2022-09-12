import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
@Input() data :any={};
@Output() item = new EventEmitter()
qty:number = 1

cartProducts:any[]=[]

  constructor() { }

  ngOnInit(): void {
  }
  add(){
    this.item.emit({item:this.data,quantity:this.qty})
    }

}
