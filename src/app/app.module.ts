import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { ProductComponent } from './components/product/product.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import {SocialAuthService, SocialLoginModule} from 'angularx-social-login';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { RegisterComponent } from './components/register/register.component';
import { SubCategorySearchComponent } from './components/sub-category-search/sub-category-search.component';
import { CapacitorsComponent } from './components/capacitors/capacitors.component';
import { ResistorsComponent } from './components/resistors/resistors.component';
import { SubCapacitorComponent } from './components/sub-capacitor/sub-capacitor.component';
import { SubResistorComponent } from './components/sub-resistor/sub-resistor.component';
import { GeneralSearchComponent } from './components/general-search/general-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    HomeComponent,
    CheckoutComponent,
    ThankyouComponent,
    ProductComponent,
    CategoriesComponent,
    LoginComponent,
    ProfileComponent,
    ProductsSearchComponent,
    RegisterComponent,
    SubCategorySearchComponent,
    CapacitorsComponent,
    ResistorsComponent,
    SubCapacitorComponent,
    SubResistorComponent,
    GeneralSearchComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        NgxSpinnerModule,
        ToastrModule.forRoot(),
        FormsModule,
        SocialLoginModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
