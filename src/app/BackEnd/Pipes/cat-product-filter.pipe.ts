import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../ViewModels/iproduct';

@Pipe({
  name: 'catProductFilter'
})
export class CatProductFilterPipe implements PipeTransform {
  transform(ProductList: (IProduct[]|undefined), Icategory: any): IProduct[] {
    let Products =  ProductList!.filter(product => product.cat_id == Number(Icategory));
    return Products;
  }
}
