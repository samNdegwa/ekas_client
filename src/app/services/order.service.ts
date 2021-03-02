import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class OrderService {
  private products: ProductResponseModel[] =[];
  private  SERVER_URL2 = environment.SERVER_URL2;

  constructor(private http: HttpClient ) { }

  // tslint:disable-next-line:typedef
  getSingleOrder(orderId: number) {
    return this.http.get<ProductResponseModel[]>(this.SERVER_URL2 + '/read-order-details.php?id=' + orderId).toPromise();
  }

}

interface ProductResponseModel {
  id: number;
  title: string;
  description: string;
  price: number;
  quantityOrdered: number;
  image: string;
}
