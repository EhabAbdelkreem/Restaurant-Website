import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];
  total: any = 0;

  constructor(private cartService:CartService) {}

  ngOnInit(): void {
    this.GetcartProducts();
  }
  GetcartProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    this.getCartTotal();
  }
  getCartTotal() {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total +=
        this.cartProducts[x].item.product_price * this.cartProducts[x].quantity;
    }
  }
  AddAmount(index:number){
this.cartProducts[index].quantity++
localStorage.setItem('cart',JSON.stringify(this.cartProducts))
this.getCartTotal();

  }

  MinsAmount(index){
    this.cartProducts[index].quantity--
    localStorage.setItem('cart',JSON.stringify(this.cartProducts))
    this.getCartTotal();
  }

  detectChange(){
    localStorage.setItem('cart',JSON.stringify(this.cartProducts))
    this.getCartTotal()
  }
  deleteproduct(index:number){
this.cartProducts.splice(index ,1)
localStorage.setItem('cart',JSON.stringify(this.cartProducts))
this.getCartTotal()

  }
  clearCart(){
    this.cartProducts= []
    localStorage.setItem('cart',JSON.stringify(this.cartProducts))
this.getCartTotal()

  }

  
}
