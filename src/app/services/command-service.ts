import {KlantToevoegenCommand} from '../commands/klant-toevoegen-command';
import {Injectable} from '@angular/core';
import {KassaTellenCommand} from '../commands/kassa-tellen-command';
import {KlantAfrekenenCommand} from '../commands/klant-afrekenen-command';
import {AankoopVerwijderenCommand} from '../commands/aankoop-verwijderen-command';
import {ProductToevoegenCommand} from '../commands/product-toevoegen-command';
import {Command} from '../commands/command';
import {AankoopToevoegenCommand} from '../commands/aankoop-toevoegen-command';
import {KassaAfsluitenCommand} from '../commands/kassa-afsluiten-command';
import {ProductWijzigenCommand} from '../commands/product-wijzigen-command';
import {KlantZetOmhoogCommand} from '../commands/klant-zet-omhoog-command';
import {KlantZetOmlaagCommand} from '../commands/klant-zet-omlaag-command';
import {DeleteKlantCommand} from '../commands/delete-klant-command';
import {ProductZetOmlaagCommand} from '../commands/product-zet-omlaag-command';
import {ProductZetOmhoogCommand} from '../commands/product-zet-omhoog-command';
import {DeleteProductCommand} from '../commands/delete-product-command';
import {KlantWijzigenCommand} from '../commands/klant-wijzigen-command';
import {KassaInitCommand} from '../commands/kassa-init-command';
import {AfrekeningViaOverschrijvingVerifierenCommand} from '../commands/afrekening-via-overschrijving-verifieren-command';
import {HistoriekInitCommand} from '../commands/historiek-init-command';
import {StateService} from './state-service';
import {CommandExecutor} from './command-executor';
import {Historiek} from '../model/historiek';


@Injectable()
export class CommandService implements CommandExecutor{

  private _nextCommandIndex: number;
  private _initialized = false;
  private _expectedCommandIndex: number;
  private remote;
  private fs;
  private workingDir;
  private commandsFile;

  public static isNotEmpty(line: string): boolean {
    return !!line;
  }


  public static deserialize(data: any): Command {
    if (data['_commandName'] === 'AankoopToevoegenCommand') return new AankoopToevoegenCommand(data['_index'], new Date(data['_timestamp']), data['_aankoopId'], data['_klantId'], data['_productId']);
    if (data['_commandName'] === 'AankoopVerwijderenCommand') return new AankoopVerwijderenCommand(data['_index'], new Date(data['_timestamp']), data['_klantId'], data['_productId']);
    if (data['_commandName'] === 'KassaTellenCommand') return new KassaTellenCommand(data['_index'], new Date(data['_timestamp']), data['_saldo'], data['_opmerking']);
    if (data['_commandName'] === 'KassaAfsluitenCommand') return new KassaAfsluitenCommand(data['_index'], new Date(data['_timestamp']), data['_bedrag'], data['_opmerking']);
    if (data['_commandName'] === 'KlantAfrekenenCommand') return new KlantAfrekenenCommand(data['_index'], new Date(data['_timestamp']), data['_klantId'], data['_viaOverschrijving']);
    if (data['_commandName'] === 'KlantToevoegenCommand') return new KlantToevoegenCommand(data['_index'], new Date(data['_timestamp']), data['_klantId'], data['_naam'], data['_klantType']);
    if (data['_commandName'] === 'KlantWijzigenCommand') return new KlantWijzigenCommand(data['_index'], new Date(data['_timestamp']), data['_klantId'], data['_naam']);
    if (data['_commandName'] === 'ProductToevoegenCommand') return new ProductToevoegenCommand(data['_index'], new Date(data['_timestamp']), data['_productId'], data['_productOmschrijving'], data['_prijsLid'], data['_prijsGast']);
    if (data['_commandName'] === 'ProductWijzigenCommand') return new ProductWijzigenCommand(data['_index'], new Date(data['_timestamp']), data['_productId'], data['_productOmschrijving'], data['_prijsLid'], data['_prijsGast']);
    if (data['_commandName'] === 'KlantZetOmhoogCommand') return new KlantZetOmhoogCommand(data['_index'], new Date(data['_timestamp']), data['_klantId']);
    if (data['_commandName'] === 'KlantZetOmlaagCommand') return new KlantZetOmlaagCommand(data['_index'], new Date(data['_timestamp']), data['_klantId']);
    if (data['_commandName'] === 'DeleteKlantCommand') return new DeleteKlantCommand(data['_index'], new Date(data['_timestamp']), data['_klantId']);
    if (data['_commandName'] === 'ProductZetOmlaagCommand') return new ProductZetOmlaagCommand(data['_index'], new Date(data['_timestamp']), data['_productId']);
    if (data['_commandName'] === 'ProductZetOmhoogCommand') return new ProductZetOmhoogCommand(data['_index'], new Date(data['_timestamp']), data['_productId']);
    if (data['_commandName'] === 'DeleteProductCommand') return new DeleteProductCommand(data['_index'], new Date(data['_timestamp']), data['_productId']);
    if (data['_commandName'] === 'KassaInitCommand') return new KassaInitCommand(data['_index'], new Date(data['_timestamp']), data['_bedrag']);
    if (data['_commandName'] === 'AfrekeningViaOverschrijvingVerifierenCommand') return new AfrekeningViaOverschrijvingVerifierenCommand(data['_index'], new Date(data['_timestamp']), data['_klantId'], data['_datum'], data['_bedrag']);
    if (data['_commandName'] === 'HistoriekInitCommand') return new HistoriekInitCommand(data['_index'], new Date(data['_timestamp']), new Historiek(data['_historiek']));


    console.log('Unknown command name: ' + data['_commandName']);
    // throw new Error('Unknown command name: ' + data['_commandName']);
  }


  constructor(private stateService: StateService) {

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
    const klantId = this.stateService.state.getKlanten().getNextKlantId();
    this.executeCommand(new KlantToevoegenCommand(this._nextCommandIndex, new Date(), klantId, naam, type));
    return klantId;
  }

  public wijzigKlant(klantId: number, naam: string) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new KlantWijzigenCommand(this._nextCommandIndex, new Date(), klantId, naam));
  }

  public voegProductToe(productOmschrijving: string, prijsLid: number, prijsGast: number): number {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    const productId = this.stateService.state.getProducten().getNextProductId();
    this.executeCommand(new ProductToevoegenCommand(this._nextCommandIndex, new Date(), productId, productOmschrijving, prijsLid, prijsGast));
    return productId;
  }

  public voegAankoopToe(klantId: number, productId: number) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new AankoopToevoegenCommand(this._nextCommandIndex, new Date(), this._nextCommandIndex, klantId, productId));
  }

  public verwijderAankoop(klantId: number, productId: number) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new AankoopVerwijderenCommand(this._nextCommandIndex, new Date(), klantId, productId));
  }

  public voegKlantAfrekenenToe(klantId: number, viaOverschrijving: boolean) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new KlantAfrekenenCommand(this._nextCommandIndex, new Date(), klantId, viaOverschrijving));
  }

  public voegKassaTellingToe(saldo: number, opmerking: string) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new KassaTellenCommand(this._nextCommandIndex, new Date(), saldo, opmerking));
  }

  public voegKassaAfsluitingToe(bedrag: number, opmerking: string) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new KassaAfsluitenCommand(this._nextCommandIndex, new Date(), bedrag, opmerking));
  }

  public wijzigProduct(productId: number, omschrijving: string, prijsLid: number, prijsGast: number) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new ProductWijzigenCommand(this._nextCommandIndex, new Date(), productId, omschrijving, prijsLid, prijsGast));
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

  public afrekeningViaOverschrijvingVerifieren(klanId: number, datum: Date, bedrag: number) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new AfrekeningViaOverschrijvingVerifierenCommand(this._nextCommandIndex, new Date(), klanId, datum, bedrag));
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
    if (command.index !== this._expectedCommandIndex) {
      console.log('Command index error: expected=' + this._expectedCommandIndex + ' huidige=' + command.index);
      this._expectedCommandIndex = command.index;
      // throw new TypeError('Command index error: expected=' + this._expectedCommandIndex + ' huidige=' + command.index);
    }
  }


  executeAankoopToevoegenCommand(command: AankoopToevoegenCommand) {
    this.stateService.aankoopToevoegen(command);
  }


  executeAankoopVerwijderenCommand(command: AankoopVerwijderenCommand) {
    this.stateService.aankoopVerwijderen(command);
  }

  executeKlantAfrekenenCommand(command: KlantAfrekenenCommand) {
    this.stateService.afrekenen(command);
  }

  executeKassaTellenCommand(command: KassaTellenCommand) {
    this.stateService.kassaTellen(command);
  }


  executeKlantToevoegenCommand(command: KlantToevoegenCommand) {
    this.stateService.klantToevoegen(command);
  }


  executeKlantWijzigenCommand(command: KlantWijzigenCommand) {
    this.stateService.klantWijzigen(command);
  }


  executeProductToevoegenCommand(command: ProductToevoegenCommand) {
    this.stateService.productToevoegen(command);
  }


  executeProductWijzigenCommand(command: ProductWijzigenCommand) {
    this.stateService.productWijzigen(command);
  }


  executeKassaAfsluitenCommand(command: KassaAfsluitenCommand) {
    this.stateService.kassaAfsluiten(command);
  }

  executeKlantZetOmhoogCommand(command: KlantZetOmhoogCommand) {
    this.stateService.zetKlantOmhoog(command);
  }

  executeKlantZetOmlaagCommand(command: KlantZetOmlaagCommand) {
    this.stateService.zetKlantOmlaag(command);
  }

  executeDeleteKlantCommand(command: DeleteKlantCommand) {
    this.stateService.deleteKlant(command);
  }

  executeProductZetOmlaagCommand(command: ProductZetOmlaagCommand) {
    this.stateService.zetProductOmlaag(command);
  }

  executeProductZetOmhoogCommand(command: ProductZetOmhoogCommand) {
    this.stateService.zetProductOmhoog(command);
  }

  executeDeleteProductCommand(command: DeleteProductCommand) {
    this.stateService.deleteProduct(command);
  }

  executeAfrekeningViaOverschrijvingVerifierenCommand(command: AfrekeningViaOverschrijvingVerifierenCommand) {
    this.stateService.verifieerAfrekeningViaOverschrijving(command);
  }

  executeKassaInitBedragCommand(command: KassaInitCommand) {
    this.stateService.kassaInit(command);
  }

  executeHistoriekInitCommand(command: HistoriekInitCommand) {
    this.stateService.historiekInit(command);
  }
}
