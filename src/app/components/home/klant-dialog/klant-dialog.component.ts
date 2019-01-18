import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CommandService} from '../../../services/command-service';
import {ProductService} from '../../../services/product-service';
import {Product} from '../../../model/product';

@Component({
  selector: 'app-klant-dialog',
  templateUrl: './klant-dialog.component.html',
  styleUrls: ['./klant-dialog.component.css']
})
export class KlantDialogComponent implements OnInit {

  public gegeven: number;
  public terug: number;
  public errorMessage: string;

  constructor(public dialogRef: MatDialogRef<KlantDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private commandService: CommandService,
              public productService: ProductService) {
  }

  ngOnInit(): void {
  }

  ok() {
    this.dialogRef.close('ok');
    if (this.gegeven && this.gegeven >= this.getAankoopTotaal()) {
      console.log('Afrekening toevoegen');
      this.commandService.voegKlantAfrekenenToe(this.data.klantId);
    }
  }

  aankoopToevoegen(product: Product) {
    this.gegeven = null;
    this.berekenTerug();
    this.commandService.voegAankoopToe(this.data.klantId, product.productId);
  }

  getOnbetaaldeAankopen() {
    return this.data.aankopen.filter(aankoop => !aankoop.betaald);
  }

  getAankoopTotaal(): number {
    return this.getOnbetaaldeAankopen()
      .map(aankoop => aankoop.getBedrag())
      .reduce((acc, currval) => acc + currval, 0);
  }

  berekenTerug() {
    if (this.gegeven) {
      this.errorMessage = this.gegeven < this.getAankoopTotaal() ? 'Het gegeven bedrag moet hoger dan het totaalbedrag zijn.' : null;
      this.terug = this.gegeven - this.getAankoopTotaal();
    } else {
      this.errorMessage = null;
      this.terug = null;
    }
  }

}
