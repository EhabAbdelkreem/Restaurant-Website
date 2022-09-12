import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id!:any
  data:any = {}
  constructor(private route:ActivatedRoute, private service:ProductsService) {
    this.id = this.route.snapshot.paramMap.get('id')
    console.log(this.id)
   }

  ngOnInit(): void {
    this.getProduct()
  }
  getProduct(){
      this.service.GetProductById(this.id).subscribe(res => {
        this.data =res
      })
  }

}
