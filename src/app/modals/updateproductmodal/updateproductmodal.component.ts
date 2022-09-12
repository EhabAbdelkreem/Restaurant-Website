
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup,FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { category } from 'src/app/models/category';
import { Products } from 'src/app/models/products';
// import { DialogData } from 'src/app/purchases/purchases.component';
import { CategoryservicesService } from 'src/app/services/categoryservices.service';
import { ProductservicesService } from 'src/app/services/productservices.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-updateproductmodal',
  templateUrl: './updateproductmodal.component.html',
   styleUrls: ['./updateproductmodal.component.scss']
 })
 export class UpdateproductmodalComponent implements OnInit {

 
  url: any;
  categories: any;
  cat: category = new category();
  product: any;
  inputProduct: Products = new Products();
  data: any;
  updateform: FormGroup;
  path:string='';
  @Input()
  updateproduct: Products =new Products();
  @Output()  updatep: EventEmitter<Products[]> = new EventEmitter();
  prod: Products = new Products();
  mess=false;
  constructor(public dialogRef: MatDialogRef<UpdateproductmodalComponent>, private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public Data: any, private categoryservices: CategoryservicesService,
    private formBuilder: FormBuilder, private productservices: ProductservicesService) {

    this.data = Data;
   

  }

  ngOnInit(): void {
    this.updateform = this.formBuilder.group({
      product_name: [''],
      product_price: [''],
      product_description: [''],
      cat_name: [''],
      id: [''],
      product_imagePath: ['']
    })
    this.categories = this.getsofcats();
    console.log(this.categories);
   this.productservices.getById(this.data.id).subscribe(result => {
     this.updateproduct = result;
     this.path = result.product_imagePath;
    });
    console.log(this.updateproduct);
    
  }

  ngOnChanges():void{
    this.updateform = this.formBuilder.group({
      product_name: [this.updateproduct.product_name],
      product_price: [this.updateproduct.product_price],
      product_description: [this.updateproduct.product_description],
      cat_name: [this.updateproduct.cat_name],
      id: [''],
      product_imagePath: [this.updateproduct.product_imagePath]
    })
}
  getsofcats() {
    this.categoryservices.getallcategories().subscribe((d: category[]) => { this.categories = d; })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  
    formdata: any = new FormData();
    onSubmit() {
    console.log("test");
    this.updateproduct.product_name = this.updateform.get('product_name').value==''?this.updateproduct.product_name:this.updateform.get('product_name').value;
    this.updateproduct.product_price = this.updateform.get('product_price').value==''?this.updateproduct.product_price:this.updateform.get('product_price').value;
    this.updateproduct.product_description = this.updateform.get('product_description').value==''?this.updateproduct.product_description:this.updateform.get('product_description').value;
    // this.inputProduct.cat_name=this.uploadform.get('cat_name')?.value;
     //this.inputProduct.cat_id=this.uploadform.get('cat_id')?.value;
     
      console.log(this.updateproduct);
      console.log(this.path)
    this.productservices.updateproducts(this.data.id,this.updateproduct,this.path).subscribe(c => { console.log(this.updateform); });
    //  this.productservices.addproduct(this.formdata).subscribe(c => { console.log(this.uploadform); });
 this.mess=true;
  } 
  uploadFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      
      this.url = reader.result;
      this.updateproduct.product_imagePathSrc = event.target.files[0];
      this.updateproduct.product_imagePath = this.url;
      
    }
  }

  selectedrole = '';
  onSelected(value: string): void {
    this.selectedrole = value;
    this.updateproduct.cat_id = parseInt(value);
    this.updateproduct.cat_name = value;


  }
  removemessage() {
    this.mess = false;
    
  }

}




