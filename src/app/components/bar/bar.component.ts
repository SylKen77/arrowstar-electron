import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product-service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  constructor(public productService: ProductService) { }

  ngOnInit() {
  }

}
