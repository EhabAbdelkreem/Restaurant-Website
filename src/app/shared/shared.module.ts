import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectComponent } from './components/select/select.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [NavbarComponent, FooterComponent, LandingpageComponent, SpinnerComponent, SelectComponent],
  imports: [
    CommonModule
  ],
  exports :[
    NavbarComponent,
    FooterComponent,
    LandingpageComponent,
    SpinnerComponent,
    SelectComponent,
    RouterModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SharedModule { }
