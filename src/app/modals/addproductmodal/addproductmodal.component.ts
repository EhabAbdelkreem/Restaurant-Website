import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup,FormsModule  } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { category } from 'src/app/models/category';
import { Products } from 'src/app/models/products';
// import { DialogData } from 'src/app/purchases/purchases.component';
import { CategoryservicesService } from 'src/app/services/categoryservices.service';
import { ProductservicesService } from 'src/app/services/productservices.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-addproductmodal',
  templateUrl: './addproductmodal.component.html',
  styleUrls: ['./addproductmodal.component.scss']
})
export class AddproductmodalComponent implements OnInit {

  
  url: any;
  categories: any;
  cat: category = new category();
  product: any;
  inputProduct: Products = new Products();
  data: any;
  uploadform: FormGroup;
  @Input()
  updateproduct: any =new Products();
  @Output()  updatep: EventEmitter<Products[]> = new EventEmitter();
  prod: Products = new Products();
  
  constructor(public dialogRef: MatDialogRef<AddproductmodalComponent>, private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public Data: any, private categoryservices: CategoryservicesService,
    private formBuilder: FormBuilder, private productservices: ProductservicesService,private router:Router) {

   
  }

  ngOnInit(): void {
   
      this.uploadform = this.formBuilder.group({
        product_name: [''],
        product_price: [''],
        product_description: [''],
        cat_name: [''],
        id: [''],
        product_imagePath: ['']
      })
  
    
    this.categories = this.getsofcats();
  }
  getsofcats() {
    this.categoryservices.getallcategories().subscribe((d: category[]) => { this.categories = d; })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

 
  formdata: any = new FormData();
  onSubmit() {
    this.inputProduct.product_name = this.uploadform.get('product_name')?.value;
    this.inputProduct.product_price = this.uploadform.get('product_price')?.value;
    this.inputProduct.product_description = this.uploadform.get('product_description')?.value;
    this.productservices.addproduct(this.inputProduct).subscribe(c => { 
      location.reload();
      this.onNoClick();
      console.log(this.uploadform); 
    });
    

  }



  uploadFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
      this.inputProduct.product_imagePathSrc = event.target.files[0];
      this.inputProduct.product_imagePath = event.target.files[0].name;
    }
  }

  selectedrole = '';
  onSelected(value: string): void {
    this.selectedrole = value;
    this.inputProduct.cat_id = parseInt(value);
    this.inputProduct.cat_name = value;


  }

  keyPress(event: any) {
    const pattern = /^[\u0621-\u064A\a-zA-Z \-\']+$/;
    let inputChar = String.fromCharCode(event.charCode);
       if (!pattern.test(inputChar)) {
           event.preventDefault();
      }
    }

    phkeyPress(event: any) {
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
             event.preventDefault();
        }
   }
}
