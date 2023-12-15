import {Injectable} from '@angular/core';
import {AankoopToevoegenCommand} from '../commands/aankoop-toevoegen-command';
import {AankoopVerwijderenCommand} from '../commands/aankoop-verwijderen-command';
import {KlantAfrekenenCommand} from '../commands/klant-afrekenen-command';
import {KassaTellenCommand} from '../commands/kassa-tellen-command';
import {KlantToevoegenCommand} from '../commands/klant-toevoegen-command';
import {KlantWijzigenCommand} from '../commands/klant-wijzigen-command';
import {ProductToevoegenCommand} from '../commands/product-toevoegen-command';
import {ProductWijzigenCommand} from '../commands/product-wijzigen-command';
import {KassaAfsluitenCommand} from '../commands/kassa-afsluiten-command';
import {KlantZetOmhoogCommand} from '../commands/klant-zet-omhoog-command';
import {KlantZetOmlaagCommand} from '../commands/klant-zet-omlaag-command';
import {DeleteKlantCommand} from '../commands/delete-klant-command';
import {ProductZetOmlaagCommand} from '../commands/product-zet-omlaag-command';
import {ProductZetOmhoogCommand} from '../commands/product-zet-omhoog-command';
import {DeleteProductCommand} from '../commands/delete-product-command';
import {AfrekeningViaOverschrijvingVerifierenCommand} from '../commands/afrekening-via-overschrijving-verifieren-command';
import {KassaInitCommand} from '../commands/kassa-init-command';
import {HistoriekInitCommand} from '../commands/historiek-init-command';
import {Klant} from '../model/klant';
import {Product} from '../model/product';
import {Command} from '../commands/command';
import {State} from '../model/state';
import {CommandService} from './command-service';
import {CommandExecutor} from './command-executor';
import {HistoriekJaar} from '../model/historiek-jaar';

@Injectable()
export class CommandCruncherService implements CommandExecutor {

  private state: State;

  private remote;
  private fs;
  private workingDir;
  private commandsFile;
  private cruchedFile;
  private currentYear: number;
  private currentStateSaved = false;
  private index= 0;

  constructor() {
    this.state = new State();
    this.currentYear = new Date().getFullYear();
    if (this.isElectron()) {
      this.remote = window.require('electron').remote;
      this.fs = this.remote.require('fs');
      this.workingDir = this.remote.getGlobal('workingDir');
      this.commandsFile = this.workingDir + '/data/commands.txt';
      this.cruchedFile = this.workingDir + '/data/commands.txt';
    }

  }

  isElectron = () => (window && window.process && window.process.type);

  public crunch() {
    console.log('Initializing CommandService');
    console.log('Reading commands from ' + this.commandsFile);
    this.fs.readFileSync(this.commandsFile)
      .toString()
      .split(/(?:\n|\r\n|\r)/g)
      .filter(line => CommandService.isNotEmpty(line))
      .map(line => CommandService.deserialize(JSON.parse(line)))
      .forEach(command => this.processCommand(command));
  }

  private processCommand(command: Command) {
    // execute commands until current year - 1 starts (we want full last year history)
    if (command.timestamp.getFullYear() < this.currentYear - 1)  {
      command.execute(this);
    } else {
      if (!this.currentStateSaved) {
        // save current state as new commands in crunched file
        this.saveCurrentState();
        this.currentStateSaved = true;
      }
      // all remaining commands appended to chrunched file
      this.writeCommand(command);
    }
  }

  private saveCurrentState() {
    const productToevoegenCommands = this.state.getProducten().getProducten().map((p, i) => this.toProductToevoegenCommand(p));
    const klantToevoegenCommands = this.state.getKlanten().getKlanten().map((k, i) => this.toKlantToevoegenCommand(k));
    const aankoopToevoegenCommands = this.getAankoopToevoegenCommands();

    productToevoegenCommands.forEach(c => this.writeCommand(c));
    klantToevoegenCommands.forEach(c => this.writeCommand(c));
    aankoopToevoegenCommands.forEach(c => this.writeCommand(c));
    this.writeCommand(this.getHistoriekInitCommand());
    this.writeCommand(this.getKassaInitBedragCommand());
  }

  private writeCommand(command: Command) {
    this.fs.appendFileSync(this.cruchedFile, JSON.stringify(command) + '\n');
  }

  getNextIndex(): number {
    return this.index++;
  }

  toProductToevoegenCommand(product: Product): ProductToevoegenCommand {
    const index = this.getNextIndex();
    return new ProductToevoegenCommand(index, this.getLastDayOfCrushed(), product.productId, product.omschrijving, product.prijsLid, product.prijsGast);
  }

  toKlantToevoegenCommand(klant: Klant): KlantToevoegenCommand {
    const index = this.getNextIndex();
    return new KlantToevoegenCommand(index, this.getLastDayOfCrushed(), klant.klantId, klant.naam, klant.klantType);
  }

  getAankoopToevoegenCommands(): AankoopToevoegenCommand[] {
    const aankoopToevoegenPerKlant = this.state.getKlanten().getKlanten().map((k, i) => this.getAankoopToevoegenCommandsPerKlant(k));
    let commands = [];
    aankoopToevoegenPerKlant.forEach((a, i) => commands = commands.concat(a));
    return commands;
  }

  getAankoopToevoegenCommandsPerKlant(klant: Klant): AankoopToevoegenCommand[] {
    return klant.aankopen
      .filter((a, i) => !a.betaald)
      .map((a, i) => {
        const index = this.getNextIndex();
        return new AankoopToevoegenCommand(index, this.getLastDayOfCrushed(), index, klant.klantId, a.product.productId);
      });
  }

  getHistoriekInitCommand(): HistoriekInitCommand {
    this.state.getHistoriek().clearDetails();
    return new HistoriekInitCommand(this.getNextIndex(), this.getLastDayOfCrushed(), this.state.getHistoriek());
  }

  toHistoriekSamenvatting(historiekJaar: HistoriekJaar) {
    historiekJaar.samenvatting
  }

  getKassaInitBedragCommand(): KassaInitCommand {
    return new KassaInitCommand(this.getNextIndex(), this.getLastDayOfCrushed(), this.state.getKassa().saldo);
  }

  private getLastDayOfCrushed() {
    return new Date(this.currentYear - 3, 12, 31, 12,0,0);
  }

  executeAankoopToevoegenCommand(command: AankoopToevoegenCommand) {
    this.state.aankoopToevoegen(command);
  }

  executeAankoopVerwijderenCommand(command: AankoopVerwijderenCommand) {
    this.state.aankoopVerwijderen(command);
  }

  executeAfrekeningViaOverschrijvingVerifierenCommand(command: AfrekeningViaOverschrijvingVerifierenCommand) {
    this.state.verifieerAfrekeningViaOverschrijving(command);
  }

  executeDeleteKlantCommand(command: DeleteKlantCommand) {
    this.state.deleteKlant(command);
  }

  executeDeleteProductCommand(command: DeleteProductCommand) {
    this.state.deleteProduct(command);
  }

  executeHistoriekInitCommand(command: HistoriekInitCommand) {
    this.state.historiekInit(command);
  }

  executeKassaAfsluitenCommand(command: KassaAfsluitenCommand) {
    this.state.kassaAfsluiten(command);
  }

  executeKassaInitBedragCommand(command: KassaInitCommand) {
    this.state.kassaInit(command);
  }

  executeKassaTellenCommand(command: KassaTellenCommand) {
    this.state.kassaTellen(command);
  }

  executeKlantAfrekenenCommand(command: KlantAfrekenenCommand) {
    this.state.afrekenen(command);
  }

  executeKlantToevoegenCommand(command: KlantToevoegenCommand) {
    this.state.klantToevoegen(command);
  }

  executeKlantWijzigenCommand(command: KlantWijzigenCommand) {
    this.state.klantWijzigen(command);
  }

  executeKlantZetOmhoogCommand(command: KlantZetOmhoogCommand) {
    this.state.zetKlantOmhoog(command);
  }

  executeKlantZetOmlaagCommand(command: KlantZetOmlaagCommand) {
    this.state.zetKlantOmlaag(command);
  }

  executeProductToevoegenCommand(command: ProductToevoegenCommand) {
    this.state.productToevoegen(command);
  }

  executeProductWijzigenCommand(command: ProductWijzigenCommand) {
    this.state.productWijzigen(command);
  }

  executeProductZetOmhoogCommand(command: ProductZetOmhoogCommand) {
    this.state.zetProductOmhoog(command);
  }

  executeProductZetOmlaagCommand(command: ProductZetOmlaagCommand) {
    this.state.zetProductOmlaag(command);
  }

}
