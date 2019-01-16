import {Injectable} from '@angular/core';
import {Store} from './store';
import {Product} from '../model/product';
import {ProductToevoegenCommand} from '../commands/product-toevoegen-command';
import {ProductWijzigenCommand} from '../commands/product-wijzigen-command';

@Injectable()
export class ProductService extends Store<Product[]> {

  constructor() {
    super([]);
  }

  productToevoegen(productToevoegenCommand: ProductToevoegenCommand) {
    this.setState([...this.state, new Product(productToevoegenCommand)]);
  }

  productWijzigen(productWijzigenCommand: ProductWijzigenCommand) {
    this.getProduct(productWijzigenCommand.productId).wijzig(productWijzigenCommand);
  }

  getProduct(productId: number): Product {
    return this.state.find(product => product.productId === productId);
  }

}
