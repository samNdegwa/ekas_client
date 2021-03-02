import { Component, OnInit } from '@angular/core';
import {ProductModelServer, ServerResponse} from '../../../models/product.model';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-sub-category-search',
  templateUrl: './sub-category-search.component.html',
  styleUrls: ['./sub-category-search.component.scss']
})
export class SubCategorySearchComponent implements OnInit {
  products: ProductModelServer[] = [];
  prod: string;
  categoris;
  subCategories;
  filter_field: string;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(data => {
        this.prod = data.subCat;

      });
     }

  ngOnInit(): void {
    this.productService.getProductsFromSubCategory(this.prod).subscribe((prods: ServerResponse) => {
          this.products = prods.products;
          console.log(prods);
        });
  }

}
