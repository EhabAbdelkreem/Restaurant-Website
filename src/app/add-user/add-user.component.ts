import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Userenum } from '../Enums/userenum.enum';
import { users } from '../models/users';
import { UserservicesService } from '../services/userservices.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  datasaved = true;
  @Input()
 users:any =new users();
 @Output() userupdated: EventEmitter<users[]> = new EventEmitter();
  permissions=[
   Userenum.admin,
  Userenum.cashier,
  Userenum.user]
  useredit: any =new users();
  message='';
  mess=false;
  
 userForm:FormGroup;
  constructor(private formbuilder: FormBuilder,private userservices:UserservicesService) { }

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      user_name: [' ', [Validators.required]],
      username: [' ', [Validators.required]],
      permission : [' ', [Validators.required]],
      password: [' ', [Validators.required]]
    });
    this.getallusers();

  }


  getallusers(){
    this.userservices.getAllusers().subscribe((data:users[])=>{this.users=data;})
  }
   
  onFormSubmit() {

    let user = this.userForm.value;
    this.addusers(user.id,user);
    this.userForm.reset();
    this.getallusers();
    window.location.reload();
  }

  addusers(id,user)
  {
    if (this.datasaved == true) {
      this.userservices.adduser(user).subscribe((res) => {
      
        user.isEdit = false;
       this.datasaved=false;
        this.message = res.message ? res.message : 'تم الحفظ بنجاح';
        this.mess = true;
      });
    } else {
    //  this.updateusers(this.users);
    this.updateusers(this.users);
     this.mess = true;
    }

  }

  selectedrole= '';
	onSelected(value:string):void {
		this.selectedrole = value;
	}
  edituser(id) {
    this.userservices.getById(id)
      .subscribe(result => {this.users = result});
      // this.userForm = this.formbuilder.group({
      //   user_name:this.useredit.user_name,
      //   username: this.useredit.username,
      //   permission : this.useredit.permission,
      //   password: this.useredit.password});

    this.datasaved = false;
  }
  removemessage() {
    this.mess = false;
  }
  updateusers(users)
  {
    this.message = '';
    this.userservices.updateusers(users)
      .subscribe({
        next: (res) => {

          //this.message = res.message ? res.message : 'تم التعديل بنجاح';
          
        },
        error: (e) => console.error(e)
      });
  }

  // updateusers(users: users) {
  //   this.userservices.updateusers(users)
  //     .subscribe((users: users[]) => this.users.emit(users));
  //   //console.log(this.categoryupdated);
  // }

  Deleteuser(id: number) {
    if (confirm(" هل تريد حذف هذا المستخدم بالفعل؟؟"))
      this.userservices
        .deleteusers(id)
        .subscribe(c => { this.getallusers(); })
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
