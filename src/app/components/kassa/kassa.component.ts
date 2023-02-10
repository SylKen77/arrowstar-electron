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
import {BetaaldViaOverschrijvingDialogComponent} from './betaald-via-overschrijving-dialog/betaald-via-overschrijving-dialog.component';
import {CommandSquasherService} from '../../services/command-squasher.service';

@Component({
  selector: 'app-kassa',
  templateUrl: './kassa.component.html',
  styleUrls: ['./kassa.component.css']
})
export class KassaComponent implements OnInit {

  public timestamp;

  constructor(public kassaService: KassaService,
              public dialog: MatDialog,
              private commandService: CommandService,
              private commandSquashService: CommandSquasherService,
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

  kassaSquashen() {
    this.commandSquashService.squash();
    this.openSnackbar('Kassa gesquashed');
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
    const dialogRef = this.dialog.open(BetaaldViaOverschrijvingDialogComponent, {
      data: oavo
    });

    dialogRef.afterClosed().subscribe(result => {
      if ('ok' === result) this.openSnackbar('Aankoop via overschrijving is afgerekend');
    });
  }

}
