import { Component, OnInit } from '@angular/core';
import {CartModelServer} from '../../../models/cart.model';
import {CartService} from '../../services/cart.service';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;
  authState: boolean;

  constructor(public cartService: CartService,
              private route: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);

    this.cartService.cartData$.subscribe(data => this.cartData = data);

    this.userService.authState$.subscribe(authState => this.authState = authState);
  }

  // tslint:disable-next-line:typedef
  selectCategory(catName: string) {
    this.route.navigate(['products/category/', catName]).then();
  }
}
