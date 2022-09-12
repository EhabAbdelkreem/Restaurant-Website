// import { NgModule } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
//<<<<<<< shehab-bransh
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';

//<<<<<<< shehab-bransh
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './LazyLoading/not-found/not-found.component';

import { BrowserModule } from '@angular/platform-browser';
import { UserPageComponent } from './LazyLoading/user-page/user-page.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { CartsModule } from '../app/carts/carts/carts.module';


//=======
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//=======

// import { ToastrModule } from 'ngx-toastr';
//>>>>>>> main

//>>>>>>> main

@NgModule({
  declarations: [
    AppComponent,
    SingInComponent,
    NotFoundComponent,
    UserPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule ,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatSliderModule,
    MatDialogModule,
    MaterialModule,
    NgbModule,
    HttpClientModule,
    SharedModule,
    ProductsModule,
    CartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
