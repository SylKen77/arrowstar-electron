import {Component, OnInit} from '@angular/core';
import {KlantService} from '../../services/klant-service';
import {CommandService} from '../../services/command-service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {KlantDialogComponent} from './klant-dialog/klant-dialog.component';
import {Klant} from '../../model/klant';

@Component({
  selector: 'app-klanten',
  templateUrl: './klanten.component.html',
  styleUrls: ['./klanten.component.css']
})
export class KlantenComponent implements OnInit {

  constructor(public klantService: KlantService,
              public commandService: CommandService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  moveKlantUp(klantId: number) {
    this.commandService.zetKlantOmhoog(klantId);
  }

  moveKlantDown(klantId: number) {
    this.commandService.zetKlantOmlaag(klantId);
  }

  deleteKlant(klantId: number) {
    this.commandService.deleteKlant(klantId);
  }

  openKlantDialogVoorNieuweKlant() {
    const dialogRef = this.dialog.open(KlantDialogComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if ('ok' === result) this.openSnackbar('Klant toegevoegd');
    });
  }

  openKlantDialog(klant: Klant) {
    const dialogRef = this.dialog.open(KlantDialogComponent, {
      width: '450px',
      data: klant
    });
    dialogRef.afterClosed().subscribe(result => {
      if ('ok' === result) this.openSnackbar('Klant gewijzigd');
    });
  }


  private openSnackbar(message: string) {
    this.snackBar.open(message, '', {duration: 2000});
  }


}
