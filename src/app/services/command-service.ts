import {KlantToevoegenCommand} from '../commands/klant-toevoegen-command';
import {Injectable} from '@angular/core';
import {KassaTellenCommand} from '../commands/kassa-tellen-command';
import {KlantAfrekenenCommand} from '../commands/klant-afrekenen-command';
import {AankoopVerwijderenCommand} from '../commands/aankoop-verwijderen-command';
import {ProductToevoegenCommand} from '../commands/product-toevoegen-command';
import {Command} from '../commands/command';
import {AankoopToevoegenCommand} from '../commands/aankoop-toevoegen-command';
import {KlantService} from './klant-service';
import {ProductService} from './product-service';
import {AankoopService} from './aankoop-service';
import {KassaService} from './kassa-service';
import {KassaAfsluitenCommand} from '../commands/kassa-afsluiten-command';
import {ProductWijzigenCommand} from '../commands/product-wijzigen-command';
import {KlantZetOmhoogCommand} from '../commands/klant-zet-omhoog-command';
import {KlantZetOmlaagCommand} from '../commands/klant-zet-omlaag-command';
import {DeleteKlantCommand} from '../commands/delete-klant-command';
import {ProductZetOmlaagCommand} from '../commands/product-zet-omlaag-command';
import {ProductZetOmhoogCommand} from '../commands/product-zet-omhoog-command';
import {DeleteProductCommand} from '../commands/delete-product-command';
import {KlantWijzigenCommand} from '../commands/klant-wijzigen-command';
import {AankoopWijzigenCommand} from '../commands/aankoop-wijzigen-command';
import {OnbetaaldeAankoopViaOverschrijvingAfrekenenCommand} from '../commands/onbetaalde-aankoop-via-overschrijving-afrekenen-command';
import {KassaInitBedragCommand} from '../commands/kassa-init-bedrag-command';


@Injectable()
export class CommandService {

  private _nextCommandIndex: number;
  private _initialized = false;
  private _expectedCommandIndex: number;
  private remote;
  private fs;
  private workingDir;
  private commandsFile;

  private static isNotEmpty(line: string): boolean {
    return !!line;
  }


  private static deserialize(data: any): Command {
    if (data['_commandName'] === 'AankoopToevoegenCommand') return new AankoopToevoegenCommand(data['_index'], new Date(data['_timestamp']), data['_aankoopId'], data['_klantId'], data['_productId'], data['_viaOverschrijving']);
    if (data['_commandName'] === 'AankoopWijzigenCommand') return new AankoopWijzigenCommand(data['_index'], new Date(data['_timestamp']), data['_klantId'], data['_productId'], data['_viaOverschrijving']);
    if (data['_commandName'] === 'AankoopVerwijderenCommand') return new AankoopVerwijderenCommand(data['_index'], new Date(data['_timestamp']), data['_klantId'], data['_productId']);
    if (data['_commandName'] === 'KassaTellenCommand') return new KassaTellenCommand(data['_index'], new Date(data['_timestamp']), data['_saldo'], data['_opmerking']);
    if (data['_commandName'] === 'KassaAfsluitenCommand') return new KassaAfsluitenCommand(data['_index'], new Date(data['_timestamp']), data['_bedrag'], data['_opmerking']);
    if (data['_commandName'] === 'KlantAfrekenenCommand') return new KlantAfrekenenCommand(data['_index'], new Date(data['_timestamp']), data['_klantId']);
    if (data['_commandName'] === 'KlantToevoegenCommand') return new KlantToevoegenCommand(data['_index'], new Date(data['_timestamp']), data['_klantId'], data['_naam'], data['_klantType']);
    if (data['_commandName'] === 'KlantWijzigenCommand') return new KlantWijzigenCommand(data['_index'], new Date(data['_timestamp']), data['_klantId'], data['_naam']);
    if (data['_commandName'] === 'ProductToevoegenCommand') return new ProductToevoegenCommand(data['_index'], new Date(data['_timestamp']), data['_productId'], data['_productOmschrijving'], data['_prijsLid'], data['_prijsGast'], data['_betaalbaarViaOverschrijving']);
    if (data['_commandName'] === 'ProductWijzigenCommand') return new ProductWijzigenCommand(data['_index'], new Date(data['_timestamp']), data['_productId'], data['_productOmschrijving'], data['_prijsLid'], data['_prijsGast'], data['_betaalbaarViaOverschrijving']);
    if (data['_commandName'] === 'KlantZetOmhoogCommand') return new KlantZetOmhoogCommand(data['_index'], new Date(data['_timestamp']), data['_klantId']);
    if (data['_commandName'] === 'KlantZetOmlaagCommand') return new KlantZetOmlaagCommand(data['_index'], new Date(data['_timestamp']), data['_klantId']);
    if (data['_commandName'] === 'DeleteKlantCommand') return new DeleteKlantCommand(data['_index'], new Date(data['_timestamp']), data['_klantId']);
    if (data['_commandName'] === 'ProductZetOmlaagCommand') return new ProductZetOmlaagCommand(data['_index'], new Date(data['_timestamp']), data['_productId']);
    if (data['_commandName'] === 'ProductZetOmhoogCommand') return new ProductZetOmhoogCommand(data['_index'], new Date(data['_timestamp']), data['_productId']);
    if (data['_commandName'] === 'DeleteProductCommand') return new DeleteProductCommand(data['_index'], new Date(data['_timestamp']), data['_productId']);
    if (data['_commandName'] === 'OnbetaaldeAankoopViaOverschrijvingAfrekenenCommand') return new OnbetaaldeAankoopViaOverschrijvingAfrekenenCommand(data['_index'], new Date(data['_timestamp']), data['_klantId'], data['_productId']);
    if (data['_commandName'] === 'KassaInitBedragCommand') return new KassaInitBedragCommand(data['_index'], new Date(data['_timestamp']), data['_bedrag']);

    throw new Error('Unknown command name: ' + data['_commandName']);
  }


  constructor(private klantService: KlantService,
              private productService: ProductService,
              private aankoopService: AankoopService,
              private kassaService: KassaService) {

    this._expectedCommandIndex = 0;
    this._nextCommandIndex = 0;

    if (this.isElectron()) {
      this.remote = window.require('electron').remote;
      this.fs = this.remote.require('fs');
      this.workingDir = this.remote.getGlobal('workingDir');
      this.commandsFile = this.workingDir + '/data/commands.txt';
    }
  }

  isElectron = () => (window && window.process && window.process.type);


  get initialized(): boolean {
    return this._initialized;
  }


  public voegKlantToe(naam: string, type: string): number {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    const klantId = this._nextCommandIndex;
    this.executeCommand(new KlantToevoegenCommand(this._nextCommandIndex, new Date(), klantId, naam, type));
    return klantId;
  }

  public wijzigKlant(klantId: number, naam: string) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new KlantWijzigenCommand(this._nextCommandIndex, new Date(), klantId, naam));
  }

  public voegProductToe(productOmschrijving: string, prijsLid: number, prijsGast: number, betaalbaarViaOverschrijving: boolean): number {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    const productId = this._nextCommandIndex;
    this.executeCommand(new ProductToevoegenCommand(this._nextCommandIndex, new Date(), productId, productOmschrijving, prijsLid, prijsGast, betaalbaarViaOverschrijving));
    return productId;
  }

  public voegAankoopToe(klantId: number, productId: number, viaOverschrijving: boolean = false) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new AankoopToevoegenCommand(this._nextCommandIndex, new Date(), this._nextCommandIndex, klantId, productId, viaOverschrijving));
  }

  public verwijderAankoop(klantId: number, productId: number) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new AankoopVerwijderenCommand(this._nextCommandIndex, new Date(), klantId, productId));
  }

  public wijzigAankopen(klantId: number, productId: number, viaOverschrijving: boolean) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new AankoopWijzigenCommand(this._nextCommandIndex, new Date(), klantId, productId, viaOverschrijving));
  }

  public voegKlantAfrekenenToe(klantId: number) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new KlantAfrekenenCommand(this._nextCommandIndex, new Date(), klantId));
  }

  public voegKassaTellingToe(saldo: number, opmerking: string) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new KassaTellenCommand(this._nextCommandIndex, new Date(), saldo, opmerking));
  }

  public voegKassaAfsluitingToe(bedrag: number, opmerking: string) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new KassaAfsluitenCommand(this._nextCommandIndex, new Date(), bedrag, opmerking));
  }

  public wijzigProduct(productId: number, omschrijving: string, prijsLid: number, prijsGast: number, betaalbaarViaOverschrijving: boolean) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new ProductWijzigenCommand(this._nextCommandIndex, new Date(), productId, omschrijving, prijsLid, prijsGast, betaalbaarViaOverschrijving));
  }

  public zetKlantOmhoog(klantId: number) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new KlantZetOmhoogCommand(this._nextCommandIndex, new Date(), klantId));
  }

  public zetKlantOmlaag(klantId: number) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new KlantZetOmlaagCommand(this._nextCommandIndex, new Date(), klantId));
  }

  public deleteKlant(klantId: number) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new DeleteKlantCommand(this._nextCommandIndex, new Date(), klantId));
  }

  public zetProductOmhoog(productId: number) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new ProductZetOmhoogCommand(this._nextCommandIndex, new Date(), productId));
  }

  public zetProductOmlaag(productId: number) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new ProductZetOmlaagCommand(this._nextCommandIndex, new Date(), productId));
  }

  public deleteProduct(productId: number) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new DeleteProductCommand(this._nextCommandIndex, new Date(), productId));
  }

  public onbetaaldeAankoopViaOverschrijvingAfrekenen(klantId: number, productId: number) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new OnbetaaldeAankoopViaOverschrijvingAfrekenenCommand(this._nextCommandIndex, new Date(), klantId, productId));
  }

  private saveCommand(command: Command) {
    this.fs.appendFileSync(this.commandsFile, JSON.stringify(command) + '\n');
  }


  public initialize() {
    if (this._initialized) return;
    console.log('Initializing CommandService');
    console.log('Reading commands from ' + this.commandsFile);
    this.fs.readFileSync(this.commandsFile)
      .toString()
      .split(/(?:\n|\r\n|\r)/g)
      .filter(line => CommandService.isNotEmpty(line))
      .map(line => CommandService.deserialize(JSON.parse(line)))
      .forEach(command => this.executeCommand(command));

    this._initialized = true;
  }


  public executeCommand(command: Command) {
    if (command) {
      this.validateCommand(command);
      command.execute(this);
      if (this.initialized) this.saveCommand(command);
      this._expectedCommandIndex++;
      this._nextCommandIndex++;
    }
  }


  private validateCommand(command: Command) {
    if (command.index !== this._expectedCommandIndex) throw new TypeError('Command index error: expected=' + this._expectedCommandIndex + ' huidige=' + command.index);
  }


  executeAankoopToevoegenCommand(command: AankoopToevoegenCommand) {
    this.aankoopService.aankoopToevoegen(command);
  }


  executeAankoopVerwijderenCommand(command: AankoopVerwijderenCommand) {
    this.aankoopService.aankoopVerwijderen(command);
  }

  executeAankoopWijzigenCommand(command: AankoopWijzigenCommand) {
    this.aankoopService.aankoopWijzigen(command);
  }


  executeKlantAfrekenenCommand(command: KlantAfrekenenCommand) {
    this.klantService.afrekenen(command);
  }


  executeKassaTellenCommand(command: KassaTellenCommand) {
    this.kassaService.kassaTellen(command);
  }


  executeKlantToevoegenCommand(command: KlantToevoegenCommand) {
    this.klantService.klantToevoegen(command);
  }


  executeKlantWijzigenCommand(command: KlantWijzigenCommand) {
    this.klantService.klantWijzigen(command);
  }


  executeProductToevoegenCommand(command: ProductToevoegenCommand) {
    this.productService.productToevoegen(command);
  }


  executeProductWijzigenCommand(command: ProductWijzigenCommand) {
    this.productService.productWijzigen(command);
  }


  executeKassaAfsluitenCommand(command: KassaAfsluitenCommand) {
    this.kassaService.kassaAfsluiten(command);
  }

  executeKlantZetOmhoogCommand(command: KlantZetOmhoogCommand) {
    this.klantService.zetKlantOmhoog(command);
  }

  executeKlantZetOmlaagCommand(command: KlantZetOmlaagCommand) {
    this.klantService.zetKlantOmlaag(command);
  }

  executeDeleteKlantCommand(command: DeleteKlantCommand) {
      this.klantService.deleteKlant(command);
  }

  executeProductZetOmlaagCommand(command: ProductZetOmlaagCommand) {
    this.productService.zetProductOmlaag(command);
  }

  executeProductZetOmhoogCommand(command: ProductZetOmhoogCommand) {
    this.productService.zetProductOmhoog(command);
  }

  executeDeleteProductCommand(command: DeleteProductCommand) {
    this.productService.deleteProduct(command);
  }

  executeOnbetaaldeAankoopViaOverschrijvingAfrekenenCommand(command: OnbetaaldeAankoopViaOverschrijvingAfrekenenCommand) {
    this.klantService.onbetaaldeAankopenViaOverschrijvingAfrekenen(command);
  }

  executeKassaInitBedragCommand(command: KassaInitBedragCommand) {
    this.kassaService.kasaInit(command);
  }
}
