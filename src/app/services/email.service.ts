import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { countiesModelServer, ServerResponse } from '../../models/counties.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private  SERVER_URL2: string = environment.SERVER_URL2;

  constructor(private http: HttpClient) { }

  sendOrderToUserEmail(user_name:string,user_email:string, product_quantity: number,amount_due: number,orderId: number){
    this.http.post(`${this.SERVER_URL2}/send-order-email.php`, {user_name,user_email,product_quantity,amount_due,orderId})
    .subscribe((data: ResponseModel): void => {

    })

  }

  sendAccountSuccessEmail(user_name: string, user_email: string) {
    this.http.post(`${this.SERVER_URL2}/send-activation-email.php`, {user_name,user_email})
    .subscribe((data:ResponseModel): void => {

    });
  }
}

export interface ResponseModel {
  prod_name: string;
  prod_quantity: number;
  amount_due: number;
  orderId: number;
  user_name: string;
  user_email: string;

}
