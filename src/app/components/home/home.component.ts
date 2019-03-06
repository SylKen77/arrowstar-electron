import {Component, OnInit} from '@angular/core';
import {KlantService} from '../../services/klant-service';
import {ProductService} from '../../services/product-service';
import {KassaService} from '../../services/kassa-service';
import {MatDialog} from '@angular/material';
import {GastAanmakenDialogComponent} from './gast-aanmaken-dialog/gast-aanmaken-dialog.component';
import {RekeningDialogComponent} from './rekening-dialog/rekening-dialog.component';
import {Klant} from '../../model/klant';
import {ImageService} from '../../services/image-service';
import {KlantType} from '../../model/klant-type';
import { DomSanitizer } from '@angular/platform-browser';

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
              public dialog: MatDialog,
              public _DomSanitizationService: DomSanitizer ) {
  }

  ngOnInit() {
  }

  openKlantAanmakenDialog(): void {
    const dialogRef = this.dialog.open(GastAanmakenDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openKlantDialog(klant: Klant): void {
    const dialogRef = this.dialog.open(RekeningDialogComponent, {
      data: klant,
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  heeftAvatar(klantId: number): boolean {
    return this.imageService.heeftAvatar(klantId);
  }

  getAvatarUrl(klantId: number): string {
    return ImageService.getAvatarUrl(klantId);
  }

  laatsteTelling(): Date {
    if (this.kassaService.state && this.kassaService.state.tellingen && this.kassaService.state.tellingen.length > 0) return this.kassaService.state.tellingen[this.kassaService.state.tellingen.length - 1].timestamp;
    return new Date();
  }

  laatsteAfsluiting(): Date {
    if (this.kassaService.state && this.kassaService.state.afsluitingen && this.kassaService.state.afsluitingen.length > 0) return this.kassaService.state.afsluitingen[this.kassaService.state.afsluitingen.length - 1].timestamp;
    return new Date();
  }

  isGast(klant: Klant) {
    return klant.klantType === KlantType.GAST;
  }

  isLid(klant: Klant) {
    return klant.klantType === KlantType.LID;
  }
}
