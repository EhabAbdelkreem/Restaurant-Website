import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import {SharedModule} from '../../shared/shared.module'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { MaterialModule } from 'src/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CartComponent, PersonalDataComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // * MATERIAL IMPORTS
    MaterialModule,
    NgbModule,
    RouterModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class CartsModule { }
