import {ProductToevoegenCommand} from '../commands/product-toevoegen-command';
import {Product} from './product';
import {ProductWijzigenCommand} from '../commands/product-wijzigen-command';
import {ProductZetOmhoogCommand} from '../commands/product-zet-omhoog-command';
import {ProductZetOmlaagCommand} from '../commands/product-zet-omlaag-command';
import {DeleteProductCommand} from '../commands/delete-product-command';

export class Producten {

  private nextProductId: number;
  private producten: Product[] = [];

  getNextProductId(): number {
    return this.nextProductId;
  }

  getProducten(): Product[] {
    return this.producten;
  }

  getProduct(productId: number): Product {
    return this.producten.find(product => product.productId === productId);
  }

  productToevoegen(c: ProductToevoegenCommand) {
    const product = new Product(c.productId, c.productOmschrijving, c.prijsLid, c.prijsGast, this.producten.length);
    this.producten = [...this.producten, product];
    this.nextProductId = Math.max(this.nextProductId, c.productId + 1);
  }

  productWijzigen(productWijzigenCommand: ProductWijzigenCommand) {
    this.getProduct(productWijzigenCommand.productId).wijzig(productWijzigenCommand);
  }

  zetProductOmhoog(command: ProductZetOmhoogCommand) {
    const product = this.getProduct(command.productId);
    const sortOrder = product.sortOrder;
    if (sortOrder === 0) return;
    const productBoven = this.producten[sortOrder - 1];
    product.setSortOrder(sortOrder - 1);
    productBoven.setSortOrder(sortOrder);
    this.sortProducten();
  }

  zetProductOmlaag(command: ProductZetOmlaagCommand) {
    const product = this.getProduct(command.productId);
    const sortOrder = product.sortOrder;
    if (sortOrder === (this.producten.length - 1)) return;
    const productOnder = this.producten[sortOrder + 1];
    product.setSortOrder(sortOrder + 1);
    productOnder.setSortOrder(sortOrder);
    this.sortProducten();

  }

  sortProducten() {
    this.producten = this.producten.sort((p1, p2) => p1.sortOrder - p2.sortOrder);
  }

  deleteProduct(command: DeleteProductCommand) {
    const product = this.getProduct(command.productId);
    this.producten = this.producten.filter(p => p !== product);
    this.setSortorderEqualToIndex();
  }

  setSortorderEqualToIndex() {
    this.producten.forEach((p, i) => p.setSortOrder(i));
  }

}
