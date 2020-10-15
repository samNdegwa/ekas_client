import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {OrderService} from '../../services/order.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {CartModelServer} from '../../../models/cart.model';
import {DatePipe, formatDate} from '@angular/common';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [DatePipe]
})
export class CheckoutComponent implements OnInit {
  cartTotal: number;
  cartData: CartModelServer;
  myDate;
 

  constructor(private cartService: CartService,
              private orderService: OrderService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    
    //this.myDate.toString.substr(9, 16);
  }

  // tslint:disable-next-line:typedef
 onCheckout() {
  this.myDate=new Date();
  let latest_date =this.datePipe.transform(this.myDate, 'yyyy-MM-dd  hh:mm:ss');
   this.spinner.show();
   this.cartService.CheckoutFromCart(2,latest_date,this.cartTotal);
   // this.spinner.hide();

  }

}
