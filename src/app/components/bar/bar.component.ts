import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product-service';
import {Product} from '../../model/product';
import {KassaTellenDialogComponent} from '../kassa/kassa-tellen-dialog/kassa-tellen-dialog.component';
import {ProductDialogComponent} from './product-dialog/product-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  constructor(public productService: ProductService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  openProductDialog(product: Product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if ('ok' === result) this.openSnackbar('Wijzigingen opgeslagen');
    });
  }

  private openSnackbar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000
    });
  }

}
