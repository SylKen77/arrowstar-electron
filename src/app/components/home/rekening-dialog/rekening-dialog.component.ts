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
      this.commandService.voegKlantAfrekenenToe(this.data.klantId);
    }
  }

  aankoopToevoegen(productId: number) {
    this.gegeven = null;
    this.berekenTerug();
    const viaOverschrijving = this.getOnbetaaldeAankopenViaOverschrijving().some(aankoop => aankoop.product.productId === productId);
    this.commandService.voegAankoopToe(this.data.klantId, productId, viaOverschrijving);
  }

  aankoopVerwijderen(productId: number) {
    this.gegeven = null;
    this.berekenTerug();
    this.commandService.verwijderAankoop(this.data.klantId, productId);
  }

  wijzigViaOverschrijving(productId: number, viaOverschrijving: boolean) {
    this.commandService.wijzigAankopen(this.data.klantId, productId, viaOverschrijving);
  }

  getOnbetaaldeAankopen() {
    return this.data.aankopen.filter(aankoop => !aankoop.betaald);
  }

  getOnbetaaldeAankopenViaOverschrijving() {
    return this.getOnbetaaldeAankopen().filter(aankoop => aankoop.viaOverschrijving);
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
