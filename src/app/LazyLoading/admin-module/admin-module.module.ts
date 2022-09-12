import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/header/header.component';
import { HomeComponent } from 'src/app/home/home.component';
import { SidenavComponent } from 'src/app/sidenav/sidenav.component';
import { PurchasesComponent } from 'src/app/purchases/purchases.component';
import { ItemsComponent } from 'src/app/items/items.component';
import { ConsumptionComponent } from 'src/app/consumption/consumption.component';
import { AddUserComponent } from 'src/app/add-user/add-user.component';
import { AddModalComponent } from 'src/app/add-modal/add-modal.component';
import { ConsumptionmodalComponent } from 'src/app/modals/consumptionmodal/consumptionmodal.component';
import { OrderesmodalComponent } from 'src/app/modals/orderesmodal/orderesmodal.component';
import { OrderdetailsmodalComponent } from 'src/app/modals/orderdetailsmodal/orderdetailsmodal.component';
import { AddproductComponent } from 'src/app/addproduct/addproduct.component';
import { AddcategoryComponent } from 'src/app/addcategory/addcategory.component';
import { AddproductmodalComponent } from 'src/app/modals/addproductmodal/addproductmodal.component';
import { TypeStatusOrderPipe } from 'src/app/BackEnd/Pipes/type-status-order.pipe';
import { CatProductFilterPipe } from 'src/app/BackEnd/Pipes/cat-product-filter.pipe';
import { AdminPagesComponent } from '../admin-pages/admin-pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { OnlineOrderComponent } from 'src/app/ComponentTIG/online-order/online-order.component';
import { MaterialModule } from 'src/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateproductmodalComponent } from 'src/app/modals/updateproductmodal/updateproductmodal.component';
import { CartsModule } from '../../carts/carts/carts.module';
import { AllOrderComponent } from 'src/app/ComponentTIG/all-order/all-order.component';

const routes: Routes = [
    {path:'', component: AdminPagesComponent ,children:[
    {path:'home', component: HomeComponent },
    {path:'onlineOrder', component: OnlineOrderComponent },
    {path:'purchases',component:PurchasesComponent},
    {path:'items',component:ItemsComponent},
    {path:'consumption',component:ConsumptionComponent},
    {path:'add-user',component:AddUserComponent},
    {path:'addproduct',component:AddproductComponent},
    {path:'addcategory',component:AddcategoryComponent},
    {path:'Allorder',component:AllOrderComponent},
    {path:'', redirectTo: 'home', pathMatch: 'full' },
    {path:'**',redirectTo:'admin',pathMatch:'full'}  
  ] },
]

@NgModule({
  declarations: [
    AdminPagesComponent,
    HeaderComponent,
    HomeComponent,
    SidenavComponent,
    PurchasesComponent,
    ItemsComponent,
    ConsumptionComponent,
    AddUserComponent,
    AddModalComponent,
    UpdateproductmodalComponent,
    ConsumptionmodalComponent,
    OrderesmodalComponent,
    OrderdetailsmodalComponent,
    AddproductComponent,
    AddcategoryComponent,
    AddproductmodalComponent,
    TypeStatusOrderPipe,
    CatProductFilterPipe,
    OnlineOrderComponent,
    AllOrderComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // * MATERIAL IMPORTS
    MaterialModule,
    NgbModule,
    RouterModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModuleModule { }
