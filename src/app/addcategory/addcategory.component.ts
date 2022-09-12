import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { category } from '../models/category';
import { CategoryservicesService } from '../services/categoryservices.service';

type NewType = category[];

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {
  categories: category[] = [];
  cattoedit?: category;
  categoryForm: FormGroup;
  message: boolean = false;
  //cats: Observable<category[]>;
  //cats: category[];
  cats: Observable<any[]>;
  datasaved = false;
  categoryitoUpdate = null;
  @Input()
  categoryin: any = new category();
  @Output() categoryupdated: EventEmitter<category[]> = new EventEmitter();
  constructor(private formbuilder: FormBuilder,
    private categoryservices: CategoryservicesService
    ) { }

  ngOnInit(): void {
    // this.categories=this.categoryservices.getallcategories();
    //  this.getrefreshcategories()
    this.categoryForm = this.formbuilder.group({
      name: [' ', [Validators.required]],
      description: [' ', [Validators.required]]
    });
    this.getsofcats();
  }


  onFormSubmit() {
    let category = this.categoryForm.value;
    this.addcategory(category);
    this.categoryForm.reset();
    this.getsofcats();
    window.location.reload();
  }

  
  getsofcats() {
    this.cats = this.categoryservices.getallcategories();
     //this.categoryservices.getallcategories().subscribe(data=>this.cats=data);
   // console.log(this.cats);
    //this.changeDetectorRefs.detectChanges();
    //.subscribe((result => this.cats=result));
  }

  addcategory(category: category) {
    if (this.datasaved == false) {
      this.categoryservices.Addcategory(category).subscribe(category => {
        this.datasaved = true;
        this.message = true;
        //this.cats.push(category);
        //this.getsofcats();
      });
    }
    else {
      this.updatecategory(this.categoryin);
      this.message = true;
    }
  }

  removemessage() {
    this.message = false;
  }

  Deletecategory(id: number) {
    if (confirm("هل تريد حذف هذه المجموعه بالفعل ؟؟"))
      this.categoryservices
        .Deletecategory(id)
        .subscribe(c => { this.getsofcats(); })
         window.location.reload();
  }
  updatecategory(categoryin: category) {
    this.categoryservices.updatecategory(categoryin)
      .subscribe((categoryin: category[]) => this.categoryupdated.emit(categoryin));
    //console.log(this.categoryupdated);
  }

  editcategory(id) {
    this.categoryservices.getcategory(id)
      .subscribe((result => this.categoryin = result));
    this.datasaved = true;
  }
    //  this.categoryForm.reset();
    //  this.getsofcats();
    //this.router.navigate([this.router.url])
    //window.location.reload();
 

  // updatecategory(category: category) {
  //   if (this.categoryitoUpdate == null) {

  //     this.categoryservices.updatecategory(category).subscribe(category => {
  //       this.datasaved = true;
  //       //this.getsofcats();
  //     });
  //   }
  //  this.categoryForm.reset();
  //  this.getsofcats();
  //this.router.navigate([this.router.url])
  //   window.location.reload();
  // }
 
  // updatecategory(categoryin:category){
  //   this.categoryservices.updatecategory(categoryin)
  //   .subscribe((categoriesup:category[]) => this.categoryupdated.emit(categoriesup));
  // }
 

  // editcategory(id)
  // {
  //   console.log(id);
  //   this.categoryin= this.categoryservices.getcategory(id);
  //   console.log(this.categoryin);
  // }

 


  // getrefreshcategories(){
  //   this.categoryservices.
  //   getallcategories()
  //   .subscribe((result:cats[]) => (this.cats=result));
  // }

  //   addcategory(){
  //   if(this.categoryin===undefined)
  //   {
  //     return;
  //   }
  //   const body=JSON.stringify(this.categoryin);
  //   this.categoryservices
  //   .Addcategory(this.categoryin)
  //   .subscribe((categoriesup:category[]) => this.categoryupdated.emit(categoriesup));
  //   this.getrefreshcategories()
  // }

  // Deletecategory(id:number){
  //   if (confirm("Delete this category?"))
  //   this.categoryservices
  //   .Deletecategory(id)
  //   .subscribe((categoriesup:category[]) => this.categoryupdated.emit(categoriesup));
  //   this.getrefreshcategories()
  // }



  // updatedcategorylist(categories:category[]){
  //   this.categories=categories;
  // }
  // initnewcategory(){
  //   this.cattoedit=new category;
  // }

  // editcategory(cat:category)
  // {
  //   this.cattoedit=cat;
  // }

  keyPress(event: any) {
    const pattern = /^[\u0621-\u064A\a-zA-Z \-\']+$/;
    let inputChar = String.fromCharCode(event.charCode);
       if (!pattern.test(inputChar)) {
           event.preventDefault();
      }
 }
}
