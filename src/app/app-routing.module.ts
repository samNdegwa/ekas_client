import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ProductComponent} from './components/product/product.component';
import {CartComponent} from './components/cart/cart.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {ThankyouComponent} from './components/thankyou/thankyou.component';
import {CategoriesComponent} from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileGuard } from './guard/profile.guard'
import { from } from 'rxjs';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { RegisterComponent } from './components/register/register.component';
import { SubCategorySearchComponent } from './components/sub-category-search/sub-category-search.component';
import { ResistorsComponent } from './components/resistors/resistors.component';
import { CapacitorsComponent } from './components/capacitors/capacitors.component';
import { SubCapacitorComponent } from './components/sub-capacitor/sub-capacitor.component';
import { SubResistorComponent } from './components/sub-resistor/sub-resistor.component';
import { GeneralSearchComponent } from './components/general-search/general-search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'product/:id',
    component: ProductComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'thankyou',
    component: ThankyouComponent
  },
  {
    path: 'products/category/:catName',
    component: CategoriesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent, canActivate: [ProfileGuard]
  },
  {
  path: 'products-search/:prod',
  component: ProductsSearchComponent
  },
  {
  path: 'register',
  component: RegisterComponent
  },
  {
    path: 'product-search/:cat/:subCat',
    component: SubCategorySearchComponent
  },
  {
    path: 'resistors-search',
    component: ResistorsComponent
  },
  {
    path: 'capacitors-search',
    component: CapacitorsComponent
  },
  {
  path: 'capacitors/:subCapacitor',
  component: SubCapacitorComponent
  },
  {
    path: 'resistor/:subResistor',
    component: SubResistorComponent
  },
  {
    path: 'general-search/:gen',
    component: GeneralSearchComponent
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
