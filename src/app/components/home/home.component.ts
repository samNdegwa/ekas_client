import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {ProductModelServer, ServerResponse} from '../../../models/product.model';
import {CartService} from '../../services/cart.service';
import {EmailService} from '../../services/email.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
products: ProductModelServer[] = [];
  constructor(private productService: ProductService,
              private  cartService: CartService,
              private router: Router,
              private email: EmailService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((prods: ServerResponse) => {
      this.products = prods.products;
      console.log(prods);
    });
    
  }
  // tslint:disable-next-line:typedef
  selectProduct(id: number) {
    this.router.navigate(['/product', id]).then();
  }

  // tslint:disable-next-line:typedef
  AddToCart(id: number){
    this.cartService.AddProductToCart(id);
  }

  // tslint:disable-next-line:typedef
  selectCategory(catName: string) {
    this.router.navigate(['/products-search/', catName]).then();
  }
}
