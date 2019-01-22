import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {KassaService} from '../../services/kassa-service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {KassaTellenDialogComponent} from './kassa-tellen-dialog/kassa-tellen-dialog.component';
import {KassaAfsluitenDialogComponent} from './kassa-afsluiten-dialog/kassa-afsluiten-dialog.component';
import {Telling} from '../../model/telling';

@Component({
  selector: 'app-kassa',
  templateUrl: './kassa.component.html',
  styleUrls: ['./kassa.component.scss']
})
export class KassaComponent implements OnInit {

  public timestamp;

  constructor(public kassaService: KassaService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.timestamp = Observable.interval(1000).map(() => new Date()).share();
  }

  kassaTellen() {
      const dialogRef = this.dialog.open(KassaTellenDialogComponent, {
        width: '400px'
      });

    dialogRef.afterClosed().subscribe(result => {
      if ('ok' === result) this.openSnackbar('Kassa geteld');
    });
  }

  kassaAfsluiten() {
    const dialogRef = this.dialog.open(KassaAfsluitenDialogComponent, {
      width: '400px'
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

}
