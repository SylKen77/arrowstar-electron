import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {KassaService} from '../../services/kassa-service';
import {MatDialog} from '@angular/material';
import {KassaTellenDialogComponent} from './kassa-tellen-dialog/kassa-tellen-dialog.component';

@Component({
  selector: 'app-kassa',
  templateUrl: './kassa.component.html',
  styleUrls: ['./kassa.component.scss']
})
export class KassaComponent implements OnInit {

  public timestamp;

  constructor(public kassaService: KassaService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.timestamp = Observable.interval(1000).map(() => new Date()).share();
  }

  kassaTellen() {
      const dialogRef = this.dialog.open(KassaTellenDialogComponent, {
        width: '400px'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Kassa tellen dialog closed: ' + result);
    });
  }

}
