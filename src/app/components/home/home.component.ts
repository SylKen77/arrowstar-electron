import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {GastAanmakenDialogComponent} from './gast-aanmaken-dialog/gast-aanmaken-dialog.component';
import {RekeningDialogComponent} from './rekening-dialog/rekening-dialog.component';
import {Klant} from '../../model/klant';
import {ImageService} from '../../services/image-service';
import {KlantType} from '../../model/klant-type';
import {DomSanitizer} from '@angular/platform-browser';
import {StateService} from '../../services/state-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public stateService: StateService,
              public imageService: ImageService,
              public dialog: MatDialog,
              public _DomSanitizationService: DomSanitizer ) {
  }

  ngOnInit() {
  }

  openKlantAanmakenDialog(): void {
    const dialogRef = this.dialog.open(GastAanmakenDialogComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openKlantDialog(klant: Klant): void {
    const dialogRef = this.dialog.open(RekeningDialogComponent, {
      data: klant,
      width: '550px'
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

  getDefaultAvatarUrl(klant: Klant): string {
    return ImageService.getDefaultAvatarUrl(klant.naam.charAt(0));
  }

  laatsteTelling(): Date {
    const aantalTellingen = this.stateService.state.getKassa().tellingen.length;
    if (aantalTellingen  > 0) return this.stateService.state.getKassa().tellingen[aantalTellingen - 1].timestamp;
    return new Date();
  }

  laatsteAfsluiting(): Date {
    const aantalAfsluitingen = this.stateService.state.getKassa().afsluitingen.length;
    if (aantalAfsluitingen > 0) return this.stateService.state.getKassa().tellingen[aantalAfsluitingen - 1].timestamp;
    return new Date();
  }

  isGast(klant: Klant) {
    return klant.klantType === KlantType.GAST;
  }

  isLid(klant: Klant) {
    return klant.klantType === KlantType.LID;
  }
}
