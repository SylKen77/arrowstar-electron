import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductDialogComponent} from './product-dialog/product-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CommandService} from '../../services/command-service';
import {StateService} from '../../services/state-service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  constructor(public commandService: CommandService,
              public stateService: StateService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  openProductDialog(product: Product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '450px',
      data: product
    });
    dialogRef.afterClosed().subscribe(result => {
      if ('ok' === result) this.openSnackbar('Product gewijzigd');
    });
  }

  openProductDialogVoorNieuwProduct() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if ('ok' === result) this.openSnackbar('Product toegevoegd');
    });
  }

  private openSnackbar(message: string) {
    this.snackBar.open(message, '', {duration: 2000});
  }

  deleteProduct(productId: number) {
    return this.commandService.deleteProduct(productId);
  }

  heeftOnbetaaldeAankopen(productId: number): boolean {
    return this.stateService.state.heeftOnbetaaldeAankopen(productId);
  }

  moveProductDown(productId: number) {
    this.commandService.zetProductOmlaag(productId);
  }

  moveProductUp(productId: number) {
    this.commandService.zetProductOmhoog(productId);
  }
}
