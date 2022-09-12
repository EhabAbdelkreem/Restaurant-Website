import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { OnlineOrderComponent } from './ComponentTIG/online-order/online-order.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { AdminPagesComponent } from './LazyLoading/admin-pages/admin-pages.component';
import { NotFoundComponent } from './LazyLoading/not-found/not-found.component';
import { AllProductComponent } from './products/components/all-product/all-product.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { UserPageComponent } from './LazyLoading/user-page/user-page.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { LandingpageComponent } from './shared/components/landingpage/landingpage.component';
import { ProductComponent } from './products/components/product/product.component';
import { CartComponent } from './carts/carts/components/cart/cart.component';
import { PersonalDataComponent } from './carts/carts/components/personal-data/personal-data.component';
import { OrderOkActivateGuard } from './BackEnd/AuthGuard/order-ok-activate.guard';
import { AuthUserGuard } from './BackEnd/AuthGuard/auth-user.guard';


//canLoad:[AuthUserGuard]
const routes: Routes = [
  { path: "admin", loadChildren: () => import('../app/LazyLoading/admin-module/admin-module.module').then(a => a.AdminModuleModule),canLoad:[AuthUserGuard]},
  {
    path: 'user', component: UserPageComponent, children: [
      { path: "home", component: LandingpageComponent },
      { path: "cart", component: CartComponent},
      { path: "personalData", component: PersonalDataComponent, canActivate:[OrderOkActivateGuard]},
      { path: "products", component: AllProductComponent },
      { path: "products/:id", component: ProductDetailsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'user', pathMatch: 'full' },
    ]
  },
  { path: 'signInOut', component: SingInComponent },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
