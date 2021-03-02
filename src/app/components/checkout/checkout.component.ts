import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {OrderService} from '../../services/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {CartModelServer} from '../../../models/cart.model';
import {DatePipe, formatDate} from '@angular/common';
import { ResponseModel, UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';
import { SocialUser } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { countiesModelServer, ServerResponse } from '../../../models/counties.model';
import { EmailService } from 'src/app/services/email.service'


declare var $: any;
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
  myUser;
  details;
  counties: countiesModelServer[] = [];
  subs: Subscription[] = [];

  constructor(private cartService: CartService,
              private orderService: OrderService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private datePipe: DatePipe,
              private userService: UserService,
              private route: ActivatedRoute,
              private email: EmailService) { }

  ngOnInit(): void {
    this.userService.authState$.subscribe(authState => {
      if (authState) {
        this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/checkout');
      } else {
        this.router.navigateByUrl('/login');
      }
    });


    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    
    this.userService.userData$
    .pipe(
      map(user => {
        if(user instanceof SocialUser) {
          return {
            email: 'test@testrrr.com',
            ...user
          };
        } else {
          return user;
        }
      })
    )
    .subscribe((data: ResponseModel | SocialUser): void => {
      this.myUser = data;
      this.userService.getUserDetails(data.email).subscribe(datas => {
        this.details = datas;
      });
    });

    // Getting counties
    this.userService.getCounties().subscribe((data: ServerResponse) => {
      this.counties = data.counties;
     // console.log(this.counties);
    });

  }

  onSubmit(data) {
    document.getElementById("btn-place-order").innerHTML="<i class='fa fa-spinner fa-pulse'></i> Placing order, Please wait...";
    $('btn-place-order').prop('disabled', true);
    // Get number of orders placed by this user
    this.myDate=new Date();
    let latest_date =this.datePipe.transform(this.myDate, 'yyyy-MM-dd  hh:mm:ss');
  // this.spinner.show()
    this.cartService.CheckoutFromCart(
      //order details
      this.details.id,latest_date,this.cartTotal,
      //Address Deails
      data.phone,data.county,data.subCounty,data.city,data.postal,data.descr);

      //Send order email to user
      //this.email.sendOrderToUserEmail(this.details.fname,this.details.email, this.cartTotal, this.cartTotal,this.details.id);
  }

}
