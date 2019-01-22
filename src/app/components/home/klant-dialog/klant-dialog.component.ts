import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CommandService} from '../../../services/command-service';
import {ProductService} from '../../../services/product-service';
import {Rekening} from '../../../model/rekening';

@Component({
  selector: 'app-klant-dialog',
  templateUrl: './klant-dialog.component.html',
  styleUrls: ['./klant-dialog.component.css']
})
export class KlantDialogComponent implements OnInit {

  public gegeven: number;
  public terug: number;
  public heeftGenoegBetaald = false;
  public betalen = false;

  constructor(public dialogRef: MatDialogRef<KlantDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private commandService: CommandService,
              public productService: ProductService) {
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
    return new Rekening(this.data.klantId, this.data.voornaam + ' ' + this.data.naam, this.data.klantType, this.productService.state, this.getOnbetaaldeAankopen());
  }

  getAankoopTotaal(): number {
    return this.getOnbetaaldeAankopen()
      .map(aankoop => aankoop.getBedrag())
      .reduce((acc, currval) => acc + currval, 0);
  }

  berekenTerug() {
    this.heeftGenoegBetaald = false;
    if (this.gegeven) {
      this.heeftGenoegBetaald = this.gegeven >= this.getAankoopTotaal();
      this.terug = this.gegeven - this.getAankoopTotaal();
    } else {
      this.terug = null;
    }
  }

}
