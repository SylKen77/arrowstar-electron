import {Injectable} from '@angular/core';
import {Store} from './store';
import {Product} from '../model/product';
import {ProductToevoegenCommand} from '../commands/product-toevoegen-command';
import {ProductWijzigenCommand} from '../commands/product-wijzigen-command';
import {ProductZetOmlaagCommand} from '../commands/product-zet-omlaag-command';
import {ProductZetOmhoogCommand} from '../commands/product-zet-omhoog-command';
import {DeleteProductCommand} from '../commands/delete-product-command';
import {KlantService} from './klant-service';

@Injectable()
export class ProductService extends Store<Product[]> {

  private nextProductId = 0;

  constructor(private klantService: KlantService) {
    super([]);
  }

  getNextProductId(): number {
    return this.nextProductId;
  }

  productToevoegen(c: ProductToevoegenCommand) {
    const product = new Product(c.productId, c.productOmschrijving, c.prijsLid, c.prijsGast, this.state.length);
    this.setState([...this.state, product]);
    this.nextProductId = Math.max(this.nextProductId, c.productId + 1);
  }

  productWijzigen(productWijzigenCommand: ProductWijzigenCommand) {
    this.getProduct(productWijzigenCommand.productId).wijzig(productWijzigenCommand);
  }

  getProduct(productId: number): Product {
    return this.state.find(product => product.productId === productId);
  }

  zetProductOmhoog(command: ProductZetOmhoogCommand) {
    const product = this.getProduct(command.productId);
    const sortOrder = product.sortOrder;
    if (sortOrder === 0) return;
    const productBoven = this.state[sortOrder - 1];
    product.setSortOrder(sortOrder - 1);
    productBoven.setSortOrder(sortOrder);
    this.sortProducten();
  }

  zetProductOmlaag(command: ProductZetOmlaagCommand) {
    const product = this.getProduct(command.productId);
    const sortOrder = product.sortOrder;
    if (sortOrder === (this.state.length - 1)) return;
    const productOnder = this.state[sortOrder + 1];
    product.setSortOrder(sortOrder + 1);
    productOnder.setSortOrder(sortOrder);
    this.sortProducten();

  }

  sortProducten() {
    this.setState(this.state.sort((p1, p2) => p1.sortOrder - p2.sortOrder));
  }

  deleteProduct(command: DeleteProductCommand) {
    const product = this.getProduct(command.productId);
    if (!this.klantService.heeftOnbetaaldeAankopen(command.productId)) this.verwijderProductUitStore(product);
    this.setSortorderEqualToIndex();
  }

  verwijderProductUitStore(product: Product) {
    this.setState(this.state.filter(k => k !== product));
    this.setSortorderEqualToIndex();
  }

  setSortorderEqualToIndex() {
    this.state.forEach((k, i) => k.setSortOrder(i));
  }

}
