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

export interface CommandExecutor {

  executeAankoopToevoegenCommand(command: AankoopToevoegenCommand);

  executeAankoopVerwijderenCommand(command: AankoopVerwijderenCommand);

  executeKlantAfrekenenCommand(command: KlantAfrekenenCommand);

  executeKassaTellenCommand(command: KassaTellenCommand);

  executeKlantToevoegenCommand(command: KlantToevoegenCommand);

  executeKlantWijzigenCommand(command: KlantWijzigenCommand);

  executeProductToevoegenCommand(command: ProductToevoegenCommand);

  executeProductWijzigenCommand(command: ProductWijzigenCommand);

  executeKassaAfsluitenCommand(command: KassaAfsluitenCommand);

  executeKlantZetOmhoogCommand(command: KlantZetOmhoogCommand);

  executeKlantZetOmlaagCommand(command: KlantZetOmlaagCommand);

  executeDeleteKlantCommand(command: DeleteKlantCommand);

  executeProductZetOmlaagCommand(command: ProductZetOmlaagCommand);

  executeProductZetOmhoogCommand(command: ProductZetOmhoogCommand);

  executeDeleteProductCommand(command: DeleteProductCommand);

  executeAfrekeningViaOverschrijvingVerifierenCommand(command: AfrekeningViaOverschrijvingVerifierenCommand);

  executeKassaInitBedragCommand(command: KassaInitCommand);

  executeHistoriekInitCommand(command: HistoriekInitCommand);

}
