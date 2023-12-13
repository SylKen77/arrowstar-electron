import {Injectable} from '@angular/core';
import {Store} from './store';
import {Product} from '../model/product';
import {ProductToevoegenCommand} from '../commands/product-toevoegen-command';
import {ProductWijzigenCommand} from '../commands/product-wijzigen-command';
import {ProductZetOmlaagCommand} from '../commands/product-zet-omlaag-command';
import {ProductZetOmhoogCommand} from '../commands/product-zet-omhoog-command';
import {DeleteProductCommand} from '../commands/delete-product-command';
import {KlantService} from './klant-service';
import {Producten} from '../model/producten';

@Injectable()
export class ProductService extends Store<Producten> {

  private producten: Producten = new Producten();

  constructor(private klantService: KlantService) {
    super(new Producten());
  }

  getNextProductId(): number {
    return this.state.getNextProductId();
  }

  getProduct(productId: number): Product {
    return this.state.getProduct(productId);
  }

  productToevoegen(command: ProductToevoegenCommand) {
    this.producten.productToevoegen(command);
    this.setState(this.producten);
  }

  productWijzigen(command: ProductWijzigenCommand) {
    this.producten.productWijzigen(command);
    this.setState(this.producten);
  }

  zetProductOmhoog(command: ProductZetOmhoogCommand) {
    this.producten.zetProductOmhoog(command);
    this.setState(this.producten);
  }

  zetProductOmlaag(command: ProductZetOmlaagCommand) {
    this.producten.zetProductOmlaag(command);
    this.setState(this.producten);
  }

  deleteProduct(command: DeleteProductCommand) {
    if (this.klantService.heeftOnbetaaldeAankopen(command.productId)) return;
    this.producten.deleteProduct(command);
    this.setState(this.producten);
  }

}
