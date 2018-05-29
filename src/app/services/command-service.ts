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
import {Klant} from '../model/klant';
import {Product} from '../model/product';

@Injectable()
export class CommandService {

  private _nextCommandIndex: number;
  private _initialized = false;
  private _expectedCommandIndex: number;
  private remote;
  private fs;

  private static isNotEmpty(line: string): boolean {
    return !!line;
  }


  private static deserialize(data: any): Command {
    if (data['_commandName'] === 'AankoopToevoegenCommand') return new AankoopToevoegenCommand(data['_index'], new Date(data['_timestamp']), data['_aankoopId'], data['_klantId'], data['_productId']);
    if (data['_commandName'] === 'AankoopVerwijderenCommand') return new AankoopVerwijderenCommand(data['_index'], new Date(data['_timestamp']), data['_klantId'], data['_productId']);
    if (data['_commandName'] === 'KassaTellenCommand') return new KassaTellenCommand(data['_index'], new Date(data['_timestamp']), data['_saldo']);
    if (data['_commandName'] === 'KassaAfsluitenCommand') return new KassaAfsluitenCommand(data['_index'], new Date(data['_timestamp']), data['_bedrag']);
    if (data['_commandName'] === 'KlantAfrekenenCommand') return new KlantAfrekenenCommand(data['_index'], new Date(data['_timestamp']), data['_klantId']);
    if (data['_commandName'] === 'KlantToevoegenCommand') return new KlantToevoegenCommand(data['_index'], new Date(data['_timestamp']), data['_klantId'], data['_naam'], data['_voornaam'], data['_klantType']);
    if (data['_commandName'] === 'ProductToevoegenCommand') return new ProductToevoegenCommand(data['_index'], new Date(data['_timestamp']), data['_productId'], data['_productOmschrijving'], data['_prijsLid'], data['_prijsGast']);
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
    }
  }

  isElectron = () => (window && window.process && window.process.type);


  get initialized(): boolean {
    return this._initialized;
  }


  public voegKlantToe(naam: string, voornaam: string, type: string) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new KlantToevoegenCommand(this._nextCommandIndex, new Date(), this._nextCommandIndex, naam, voornaam, type));
  }

  public voegProductToe(productOmschrijving: string, prijsLid: number, prijsGast: number) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new ProductToevoegenCommand(this._nextCommandIndex, new Date(), this._nextCommandIndex, productOmschrijving, prijsLid, prijsGast));
  }

  public voegAankoopToe(klantId: number, productId: number) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new AankoopToevoegenCommand(this._nextCommandIndex, new Date(), this._nextCommandIndex, klantId, productId));
  }

  public voegKlantAfrekenenToe(klantId: number) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new KlantAfrekenenCommand(this._nextCommandIndex, new Date(), klantId));
  }

  public voegKassaTellingToe(saldo: number) {
    if (!this.initialized) throw new Error('CommandFactory not initialized');
    this.executeCommand(new KassaTellenCommand(this._nextCommandIndex, new Date(), saldo));
  }

  private saveCommand(command: Command) {
    this.fs.appendFileSync('data/commands.txt', JSON.stringify(command) + '\n');
  }


  public initialize() {
    if (this._initialized) return;
    console.log('Initializing CommandService');
    this.fs.readFileSync('data/commands.txt')
      .toString()
      .split(/(?:\n|\r\n|\r)/g)
      .filter(line => CommandService.isNotEmpty(line))
      .map(line => CommandService.deserialize(JSON.parse(line)))
      .forEach(command => this.executeCommand(command));

    this._initialized = true;
  }


  public executeCommand(command: Command) {
    if (command) {
      console.log('Executing command: ' + JSON.stringify(command));
      this.validateCommand(command);
      command.execute(this);
      if (this.initialized) this.saveCommand(command);
      this._expectedCommandIndex++;
      this._nextCommandIndex++;
      console.log('Command ' + command.index + ' executed. NextCommandIndex: ' + this._nextCommandIndex + ' Next ExpectedCommandIndex: ' + this._expectedCommandIndex);
    }
  }


  private validateCommand(command: Command) {
    if (command.index !== this._expectedCommandIndex) throw new TypeError('Command index error: expected=' + this._expectedCommandIndex + ' huidige=' + command.index);
  }


  executeAankoopToevoegenCommand(command: AankoopToevoegenCommand) {
    console.log('executeAankoopToevoegenCommand: ' + command);
    this.aankoopService.aankoopToevoegen(command);
  }


  executeAankoopVerwijderenCommand(command: AankoopVerwijderenCommand) {
    console.log('executeAankoopVerwijderenCommand: ' + command);
    this.aankoopService.aankoopVerwijderen(command);
  }


  executeKlantAfrekenenCommand(command: KlantAfrekenenCommand) {
    console.log('executeKlantAfrekenenCommand: ' + command);
    this.klantService.afrekenen(command);
  }


  executeKassaTellenCommand(command: KassaTellenCommand) {
    console.log('executeKassaTellenCommand: ' + command);
    this.kassaService.kassaTellen(command);
  }


  executeKlantToevoegenCommand(command: KlantToevoegenCommand) {
    console.log('CommandService.executeKlantToevoegenCommand: ' + command.index);
    this.klantService.klantToevoegen(command);
  }


  executeProductToevoegenCommand(command: ProductToevoegenCommand) {
    console.log('CommandService.executeProductToevoegenCommand: ' + command.index);
    this.productService.productToevoegen(command);
  }

  executeKassaAfsluitenCommand(command: KassaAfsluitenCommand) {
    console.log('CommandService.executeKassaAfsluitenCommand: ' + command.index);
    this.kassaService.kassaAfsluiten(command);
  }

}
