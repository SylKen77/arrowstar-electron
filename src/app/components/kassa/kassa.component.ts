import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {MatDialog, MatSnackBar} from '@angular/material';
import {KassaTellenDialogComponent} from './kassa-tellen-dialog/kassa-tellen-dialog.component';
import {KassaAfsluitenDialogComponent} from './kassa-afsluiten-dialog/kassa-afsluiten-dialog.component';
import {Telling} from '../../model/telling';
import {CommandService} from '../../services/command-service';
import {BetaaldViaOverschrijvingDialogComponent} from './betaald-via-overschrijving-dialog/betaald-via-overschrijving-dialog.component';
import {CommandSquasherService} from '../../services/command-squasher.service';
import {AfrekeningViaOverschrijving} from '../../model/afrekening-via-overschrijving';
import {StateService} from '../../services/state-service';
import {CommandCruncherService} from '../../services/command-cruncher.service';

@Component({
  selector: 'app-kassa',
  templateUrl: './kassa.component.html',
  styleUrls: ['./kassa.component.css']
})
export class KassaComponent implements OnInit {

  public timestamp;

  constructor(public stateService: StateService,
              public dialog: MatDialog,
              private commandCruchService: CommandCruncherService,
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
    this.commandCruchService.crunch();
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

  betaalOnbetaaldeAankopenViaOverschrijving(oavo: AfrekeningViaOverschrijving) {
    const dialogRef = this.dialog.open(BetaaldViaOverschrijvingDialogComponent, {
      data: oavo
    });

    dialogRef.afterClosed().subscribe(result => {
      if ('ok' === result) this.openSnackbar('Aankoop via overschrijving geverifiëerd');
    });
  }

}
