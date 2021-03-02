import { Component, OnInit } from '@angular/core';
import {ProductModelServer, ServerResponse} from '../../../models/product.model';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map} from 'rxjs/operators';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-products-search',
  templateUrl: './products-search.component.html',
  styleUrls: ['./products-search.component.scss']
})
export class ProductsSearchComponent implements OnInit {

  products: ProductModelServer[] = [];
  prod: string;
  categoris;
  subCategories;
  filter_field: string;
  constructor(private productService: ProductService,
               private cartService: CartService,
               private route: ActivatedRoute) {
                this.route.params.subscribe(data => {
                  this.prod = data.prod;
                });
                }

  ngOnInit(): void {
    // @ts-ignore
      this.productService.getProductFromCategory(this.prod).subscribe((prods: ServerResponse) => {
        this.products = prods.products;
        //console.log(this.products);
      });

      this.productService.getFilteredCategories(this.prod).subscribe(cats =>{
         this.categoris = cats;
         this.productService.getFilteredSubCategories(this.categoris.categories[0].id).subscribe(sub =>{
          this.subCategories = sub;
        })
      });
    
  }

  filter_within(form: NgForm) {
      const filter_field: string = this.filter_field;
      this.productService.getProductFromCategory(filter_field).subscribe(data => {
        this.products = data;
        console.log(data);
      });
  }

}
