import {Injectable} from '@angular/core';
import {KlantService} from './klant-service';
import {ProductService} from './product-service';
import {AankoopService} from './aankoop-service';
import {KassaService} from './kassa-service';
import {Klant} from '../model/klant';
import {KlantToevoegenCommand} from '../commands/klant-toevoegen-command';
import {AankoopToevoegenCommand} from '../commands/aankoop-toevoegen-command';
import {Product} from '../model/product';
import {ProductToevoegenCommand} from '../commands/product-toevoegen-command';
import {Command} from '../commands/command';
import {Kassa} from '../model/kassa';
import {KassaTellenCommand} from '../commands/kassa-tellen-command';
import {KassaAfsluitenCommand} from '../commands/kassa-afsluiten-command';
import {KassaInitBedragCommand} from '../commands/kassa-init-bedrag-command';


@Injectable()
export class CommandSquasherService {

  index: number;

  private remote;
  private fs;
  private workingDir;
  private commandsFile;


  constructor(private klantService: KlantService,
              private productService: ProductService,
              private aankoopService: AankoopService,
              private kassaService: KassaService) {
    this.index = 0;
    if (this.isElectron()) {
      this.remote = window.require('electron').remote;
      this.fs = this.remote.require('fs');
      this.workingDir = this.remote.getGlobal('workingDir');
      this.commandsFile = this.workingDir + '/data/squashedCommands.txt';
    }
  }

  isElectron = () => (window && window.process && window.process.type);

  squash() {
    const productToevoegenCommands = this.productService.state.map((p, i) => this.toProductToevoegenCommand(p));
    const klantToevoegenCommands = this.klantService.state.map((k, i) => this.toKlantToevoegenCommand(k));
    const aankoopToevoegenCommands = this.getAankoopToevoegenCommands(this.klantService.state);
    const kassaTellingenCommands = this.getKassaTellenCommands(this.kassaService.state);
    const kassaAfsluitenCommands = this.getKassaAfsluitenCommands(this.kassaService.state);

    productToevoegenCommands.forEach(c => this.saveCommand(c));
    klantToevoegenCommands.forEach(c => this.saveCommand(c));
    aankoopToevoegenCommands.forEach(c => this.saveCommand(c));
    kassaTellingenCommands.forEach(c => this.saveCommand(c));
    kassaAfsluitenCommands.forEach(c => this.saveCommand(c));
    this.saveCommand(this.getKassaInitBedragCommand(this.kassaService.state));
  }

  private saveCommand(command: Command) {
    this.fs.appendFileSync(this.commandsFile, JSON.stringify(command) + '\n');
  }

  getNextIndex(): number {
    return this.index++;
  }

  toProductToevoegenCommand(product: Product): ProductToevoegenCommand {
    const index = this.getNextIndex();
    return new ProductToevoegenCommand(index, new Date(), product.productId, product.omschrijving, product.prijsLid, product.prijsGast);
  }

  toKlantToevoegenCommand(klant: Klant): KlantToevoegenCommand {
    const index = this.getNextIndex();
    return new KlantToevoegenCommand(index, new Date(), klant.klantId, klant.naam, klant.klantType);
  }

  getAankoopToevoegenCommands(klanten: Klant[]): AankoopToevoegenCommand[] {
    const aankoopToevoegenPerKlant = klanten.map((k, i) => this.getAankoopToevoegenCommandsPerKlant(k));
    let commands = [];
    aankoopToevoegenPerKlant.forEach((a, i) => commands = commands.concat(a));
    return commands;
  }

  getKassaTellenCommands(kassa: Kassa): KassaTellenCommand[] {
    return kassa.tellingen.map(telling => new KassaTellenCommand(this.getNextIndex(), telling.timestamp, telling.tellingSaldo, telling.opmerking));
  }

  getKassaAfsluitenCommands(kassa: Kassa): KassaAfsluitenCommand[] {
    return kassa.afsluitingen.map(afsluiting => new KassaAfsluitenCommand(this.getNextIndex(), afsluiting.timestamp, afsluiting.bedrag, afsluiting.opmerking));
  }

  getAankoopToevoegenCommandsPerKlant(klant: Klant): AankoopToevoegenCommand[] {
    return klant.aankopen
      .filter((a, i) => !a.betaald)
      .map((a, i) => {
        const index = this.getNextIndex();
        return new AankoopToevoegenCommand(index, new Date(), index, klant.klantId, a.product.productId);
      });
  }

  getKassaInitBedragCommand(kassa: Kassa): KassaInitBedragCommand {
    return new KassaInitBedragCommand(this.getNextIndex(), new Date(), kassa.saldo);
  }

}
