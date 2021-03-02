import { Component, OnInit } from '@angular/core';
import {CartModelServer} from '../../../models/cart.model';
import {CartService} from '../../services/cart.service';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ProductModelServer } from 'src/models/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;
  authState: boolean;
  searchName: string;
  products: ProductModelServer[] = [];

  constructor(public cartService: CartService,
              private route: Router,
              private userService: UserService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total)

    this.cartService.cartData$.subscribe(data => this.cartData = data);

    this.userService.authState$.subscribe(authState => this.authState = authState);
  }

  // tslint:disable-next-line:typedef
  selectCategory(catName: string) {
    this.route.navigate(['products/category/', catName]).then();
  }

  submitSearch(form: NgForm) {
      const searchName: string = this.searchName;
       // @ts-ignore
      
        this.route.navigateByUrl('general-search/'+searchName).then(rel =>{
          location.reload(); 
        })
      
  }
}
