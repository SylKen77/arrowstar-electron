import {Component, OnInit} from '@angular/core';
import {KlantService} from '../../services/klant-service';
import {ProductService} from '../../services/product-service';
import {KassaService} from '../../services/kassa-service';
import {MatDialog} from '@angular/material';
import {GastAanmakenDialogComponent} from './gast-aanmaken-dialog/gast-aanmaken-dialog.component';
import {RekeningDialogComponent} from './rekening-dialog/rekening-dialog.component';
import {Klant} from '../../model/klant';
import {Observable} from 'rxjs/Observable';
import {ImageService} from '../../services/image-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public klantService: KlantService,
              public productService: ProductService,
              public kassaService: KassaService,
              public imageService: ImageService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openKlantAanmakenDialog(): void {
    const dialogRef = this.dialog.open(GastAanmakenDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openKlantDialog(klant: Klant): void {
    const dialogRef = this.dialog.open(RekeningDialogComponent, {
      data: klant
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getAvatar(klantId: number): string {
    return this.imageService.getAvatar('' + klantId).contentBase64;
  }

  laatsteTelling(): Date {
    if (this.kassaService.state && this.kassaService.state.tellingen) return this.kassaService.state.tellingen[this.kassaService.state.tellingen.length - 1].timestamp;
    return new Date();
  }

  laatsteAfsluiting(): Date {
    if (this.kassaService.state && this.kassaService.state.afsluitingen) return this.kassaService.state.afsluitingen[this.kassaService.state.afsluitingen.length - 1].timestamp;
    return new Date();
  }
}
