import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent implements OnInit {

  constructor(private service:ProductsService) { }
  products:any[]= [];
  categories:any[]=[];
  loading:boolean=false;
  cartProducts:any[]=[]

  ngOnInit(): void {
    this.GetProducts();
    this.GetCategories();
  }

  
  GetProducts(){
    this.loading=true
    this.service.GetAllProducts().subscribe((res:any) => {
      this.products = res;
      this.loading=false
      
    }, error =>{
      // alert(error)
    }) }

    GetCategories(){
      this.loading=true

      this.service.GetAllCategries().subscribe((res:any) => {
        this.categories = res;
        this.loading=false
      }, error =>{
        // alert(error)
      })}

      FilterCategory(event:any){
        this.loading=true

        let value =event.target.value;
        if(value == "All" ){
          this.GetProducts();
          this.loading=false

        }else{ 

          this.GetProductsCategry(value)
        }

      }
      GetProductsCategry(keyword:string){
        this.loading=true

        this.service.GetProductbyCategry(keyword).subscribe((res:any) =>{
           this.products = res
           this.loading=false
          })
      }

      AddToCart(event:any){
        
        if("cart" in localStorage){
          this.cartProducts = JSON.parse(localStorage.getItem('cart')!)
          let exist = this.cartProducts.find(res => res.item.product_id  == event.item.product_id)
          if(exist){
            alert("product is already in your cart")
          }else{
            this.cartProducts.push(event)
            localStorage.setItem('cart',JSON.stringify(this.cartProducts))
          }
         
        }
        else{
          this.cartProducts.push(event)
          localStorage.setItem('cart',JSON.stringify(this.cartProducts))
        }

      }
}
