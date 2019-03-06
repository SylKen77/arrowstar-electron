import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CommandService} from '../../../services/command-service';
import {Product} from '../../../model/product';
import {KlantService} from '../../../services/klant-service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  public omschrijving: string;
  public prijsLid: number;
  public prijsGast: number;
  public betaalbaarViaOverschrijving: boolean;

  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public product: Product,
              private commandService: CommandService,
              public klantService: KlantService) {
  }

  ngOnInit() {
    if (this.product) {
      this.omschrijving = this.product.omschrijving;
      this.prijsLid = this.product.prijsLid;
      this.prijsGast = this.product.prijsGast;
      this.betaalbaarViaOverschrijving = this.product.betaalbaarViaOverschrijving;
    } else {
      this.omschrijving = 'Nieuw product';
      this.prijsLid = 1.00;
      this.prijsGast = 1.50;
      this.betaalbaarViaOverschrijving = false;
    }
  }

  ok() {
    this.dialogRef.close('ok');
    if (this.product) {
      this.commandService.wijzigProduct(this.product.productId, this.omschrijving, this.prijsLid, this.prijsGast, this.betaalbaarViaOverschrijving);
    } else {
      this.commandService.voegProductToe(this.omschrijving, this.prijsLid, this.prijsGast, this.betaalbaarViaOverschrijving);
    }
  }

  heeftOnbetaaldeAankopenViaOverschrijving(): boolean {
    return this.klantService.state.some(klant => klant.getOnbetaaldeAankopen()
      .filter(aankoop => aankoop.product.productId === this.product.productId)
      .some(aankoop => aankoop.viaOverschrijving));
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

}
