import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ProductModelServer, ServerResponse} from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 private SERVER_URL = environment.SERVER_URL;
 private SERVER_URL2 = environment.SERVER_URL2;

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  getAllProducts(numbersOfResults = 10): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL2 + '/all-products.php', {
      params: {
        limit: numbersOfResults.toString()
      }
    });
  }

  /* Get Single product from server */
  getSingleProduct(id: number): Observable<ProductModelServer> {
    return  this.http.get<ProductModelServer>(this.SERVER_URL2 + '/single-product.php?id=' + id);
  }

  /*Get products from one category*/
  getProductFromCategory(catName: string): Observable<ProductModelServer[]> {
    return  this.http.get<ProductModelServer[]>(this.SERVER_URL2 + '/products-category.php?cat=' + catName);
  }

  // Get filtered categories

  getFilteredCategories(cat: string) {
    return this.http.get(this.SERVER_URL2 + '/filter-categories.php?cat=' + cat);
  }

  // Get filtered sub categories
  getFilteredSubCategories(id: number) {
    return this.http.get(this.SERVER_URL2 + '/filtered-subcategories.php?id=' +id)
  }

  //Get products from a sub category
  getProductsFromSubCategory(subCat: string) {
    return this.http.get(this.SERVER_URL2 + '/read-sub-category-products.php?subcat=' +subCat);
  }
}
