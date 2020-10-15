import { Component, OnInit } from '@angular/core';
import {ProductModelServer, ServerResponse} from '../../../models/product.model';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  products: ProductModelServer[] = [];
  catName: string;
  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.catName;
      })
    ).subscribe(prodName => {
      this.catName = prodName;
      // @ts-ignore
      this.productService.getProductFromCategory(this.catName).subscribe((prods: ServerResponse) => {
        this.products = prods.products;
      });
    });
  }
  // tslint:disable-next-line:typedef
  AddToCart(id: number){
    this.cartService.AddProductToCart(id);
  }
  // tslint:disable-next-line:typedef
  // selectProduct(id: number) {
  //   this.route.navigate(['/product', id]).then();
  // }

}
