import { Component, OnInit } from '@angular/core';
import {ProductModelServer, ServerResponse} from '../../../models/product.model';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-capacitors',
  templateUrl: './capacitors.component.html',
  styleUrls: ['./capacitors.component.scss']
})
export class CapacitorsComponent implements OnInit {
  products: ProductModelServer[] = [];
  categoris;
  subCategories;

  constructor(private productService: ProductService,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
      // @ts-ignore
      this.productService.getProductFromCategory('Capacitors').subscribe((prods: ServerResponse) => {
        this.products = prods.products;
        //console.log(this.products);
      });

      this.productService.getFilteredCategories('Capacitors').subscribe(cats =>{
         this.categoris = cats;
      });

      this.productService.getFilteredSubCategories(7).subscribe(sub =>{
        this.subCategories = sub;
      })
  }

}
