import {Component, OnInit} from '@angular/core';
import {KlantService} from '../../services/klant-service';
import {ProductService} from '../../services/product-service';
import {KassaService} from '../../services/kassa-service';
import {MatDialog} from '@angular/material';
import {KlantAanmakenDialogComponent} from './klant-aanmaken-dialog/klant-aanmaken-dialog.component';
import {KlantDialogComponent} from './klant-dialog/klant-dialog.component';
import {Klant} from '../../model/klant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public klantService: KlantService,
              public productService: ProductService,
              public kassaService: KassaService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openKlantAanmakenDialog(): void {
    const dialogRef = this.dialog.open(KlantAanmakenDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openKlantDialog(klant: Klant): void {
    const dialogRef = this.dialog.open(KlantDialogComponent, {
      width: '600px',
      data: klant
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
