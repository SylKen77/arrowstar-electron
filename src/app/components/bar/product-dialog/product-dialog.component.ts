import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CommandService} from '../../../services/command-service';
import {Product} from '../../../model/product';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  public omschrijving: string;
  public prijsLid: number;
  public prijsGast: number;
  public betaalbaarViaOverschrijving: boolean;

  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public product: Product,
              private commandService: CommandService) {
  }

  ngOnInit() {
    if (this.product) {
      this.omschrijving = this.product.omschrijving;
      this.prijsLid = this.product.prijsLid;
      this.prijsGast = this.product.prijsGast;
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
      this.commandService.wijzigProduct(this.product.productId, this.omschrijving, this.prijsLid, this.prijsGast);
    } else {
      this.commandService.voegProductToe(this.omschrijving, this.prijsLid, this.prijsGast);
    }
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

}
