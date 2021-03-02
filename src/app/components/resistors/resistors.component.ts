import { Component, OnInit } from '@angular/core';
import {ProductModelServer, ServerResponse} from '../../../models/product.model';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-resistors',
  templateUrl: './resistors.component.html',
  styleUrls: ['./resistors.component.scss']
})
export class ResistorsComponent implements OnInit {
  products: ProductModelServer[] = [];
  categoris;
  subCategories;
  filter_field: string;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.productService.getProductFromCategory('Resistor').subscribe((prods: ServerResponse) => {
      this.products = prods.products;
      //console.log(this.products);
    });

    this.productService.getFilteredCategories('Resistor').subscribe(cats =>{
       this.categoris = cats;
    });

    this.productService.getFilteredSubCategories(10).subscribe(sub =>{
      this.subCategories = sub;
    })
  }

  filter_within(form: NgForm) {
    const filter_field: string = this.filter_field;
    this.productService.getProductFromCategory(filter_field).subscribe(data => {
      this.products = data;
    });
}

}
