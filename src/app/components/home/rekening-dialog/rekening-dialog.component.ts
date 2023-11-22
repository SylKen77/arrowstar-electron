import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CommandService} from '../../../services/command-service';
import {ProductService} from '../../../services/product-service';
import {Rekening} from '../../../model/rekening';
import {ImageService} from '../../../services/image-service';
import {Klant} from '../../../model/klant';
import {KlantType} from '../../../model/klant-type';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-klant-dialog',
  templateUrl: './rekening-dialog.component.html',
  styleUrls: ['./rekening-dialog.component.css']
})
export class RekeningDialogComponent implements OnInit {

  public gegeven: number;
  public terug: number;
  public heeftGenoegBetaald = false;
  public betalen = false;
  public toonViaOverschrijving = false;

  public qr = 'BCD\n' +
    '001\n' +
    '1\n' +
    'SCT\n' +
    'GKCCBEBB\n' +
    'Arrowstar Boogschutters\n' +
    'BE77778590166142\n' +
    'EUR15.00\n' +
    '\n' +
    'Afrekening Bar ' ;

  constructor(public dialogRef: MatDialogRef<RekeningDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private commandService: CommandService,
              public imageService: ImageService,
              public productService: ProductService,
              public _DomSanitizationService: DomSanitizer ) {
  }

  ngOnInit(): void {
  }

  setBetalen() {
    this.betalen = true;
  }

  annuleerAfrekenen() {
    this.gegeven = null;
    this.berekenTerug();
    this.betalen = false;
  }

  ok() {
    this.dialogRef.close('ok');
    if (this.gegeven && this.gegeven >= this.getAankoopTotaal()) {
      this.commandService.voegKlantAfrekenenToe(this.data.klantId, false);
    }
  }

  okViaOverschrijving() {
    this.dialogRef.close('OkViaOverschrijving');
    this.commandService.voegKlantAfrekenenToe(this.data.klantId, true);
  }

  viaOverschrijving() {
    this.qr = 'BCD\n' +
      '001\n' +
      '1\n' +
      'SCT\n' +
      'GKCCBEBB\n' +
      'Arrowstar Boogschutters\n' +
      'BE77778590166142\n' +
      'EUR' + this.getAankoopTotaal().toFixed(2) + '\n' +
      '\n' +
      'Afrekening ' + this.data.naam + ' ' + new Date().toLocaleDateString('nl-BE', { timeZone: 'UTC' });
    this.toonViaOverschrijving = true;
  }

  annuleerViaOverschrijving() {
    this.toonViaOverschrijving = false;
  }

  aankoopToevoegen(productId: number) {
    this.gegeven = null;
    this.berekenTerug();
    this.commandService.voegAankoopToe(this.data.klantId, productId);
  }

  aankoopVerwijderen(productId: number) {
    this.gegeven = null;
    this.berekenTerug();
    this.commandService.verwijderAankoop(this.data.klantId, productId);
  }

  getOnbetaaldeAankopen() {
    return this.data.aankopen.filter(aankoop => !aankoop.betaald);
  }

  getRekening() {
    return new Rekening(this.data.klantId, this.data.naam, this.data.klantType, this.productService.state, this.getOnbetaaldeAankopen());
  }

  getAankoopTotaal(): number {
    return this.getOnbetaaldeAankopen()
      .filter(aankoop => !aankoop.viaOverschrijving)
      .map(aankoop => aankoop.getBedrag())
      .reduce((acc, currval) => acc + currval, 0);
  }

  berekenTerug() {
    this.heeftGenoegBetaald = false;
    if (this.gegeven) {
      this.heeftGenoegBetaald = (this.gegeven > this.getAankoopTotaal()) || (Math.abs(this.gegeven - this.getAankoopTotaal()) < 0.01);
      this.terug = this.gegeven - this.getAankoopTotaal();
    } else {
      this.terug = null;
    }
  }

  heeftAvatar(klantId: number): boolean {
    return this.imageService.heeftAvatar(klantId);
  }

  getAvatarUrl(klantId: number): string {
    return ImageService.getAvatarUrl(klantId);
  }

  isGast(klant: Klant) {
    return klant.klantType === KlantType.GAST;
  }

  isLid(klant: Klant) {
    return klant.klantType === KlantType.LID;
  }


}
