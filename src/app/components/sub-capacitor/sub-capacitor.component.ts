import { Component, OnInit } from '@angular/core';
import {ProductModelServer, ServerResponse} from '../../../models/product.model';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-sub-capacitor',
  templateUrl: './sub-capacitor.component.html',
  styleUrls: ['./sub-capacitor.component.scss']
})
export class SubCapacitorComponent implements OnInit {
  products: ProductModelServer[] = [];
  prod: string;
  categoris;
  subCategories;
  filter_field: string;

  constructor( private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) { 
      this.route.params.subscribe(data => {
        this.prod = data.subCapacitor;
      });
    }

  ngOnInit(): void {
    this.productService.getProductsFromSubCategory(this.prod).subscribe((prods: ServerResponse) => {
      this.products = prods.products;
    });
  }

}
