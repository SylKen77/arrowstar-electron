import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {KassaService} from '../../services/kassa-service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {KassaTellenDialogComponent} from './kassa-tellen-dialog/kassa-tellen-dialog.component';
import {KassaAfsluitenDialogComponent} from './kassa-afsluiten-dialog/kassa-afsluiten-dialog.component';
import {Telling} from '../../model/telling';
import {OnbetaaldeAankoopViaOverschrijving} from '../../model/onbetaalde-aankoop-via-overschrijving';
import {CommandService} from '../../services/command-service';

@Component({
  selector: 'app-kassa',
  templateUrl: './kassa.component.html',
  styleUrls: ['./kassa.component.scss']
})
export class KassaComponent implements OnInit {

  public timestamp;

  constructor(public kassaService: KassaService,
              public dialog: MatDialog,
              private commandService: CommandService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.timestamp = new Date();
  }

  kassaTellen() {
      const dialogRef = this.dialog.open(KassaTellenDialogComponent, {
      });

    dialogRef.afterClosed().subscribe(result => {
      if ('ok' === result) this.openSnackbar('Kassa geteld');
    });
  }

  kassaAfsluiten() {
    const dialogRef = this.dialog.open(KassaAfsluitenDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if ('ok' === result) this.openSnackbar('Kassa afgesloten');
    });
  }


  private openSnackbar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000
    });
  }

  getVerschilStatus(telling: Telling): string {
    if (telling.isZonderAfwijking()) return 'ok';
    if (telling.verschil > 0) return 'positief';
    return 'negatief';
  }

  betaalOnbetaaldeAankopenViaOverschrijving(oavo: OnbetaaldeAankoopViaOverschrijving) {
    this.commandService.onbetaaldeAankoopViaOverschrijvingAfrekenen(oavo.klant.klantId, oavo.product.productId);
  }

}
