import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CommandService} from '../../../services/command-service';
import {KlantType} from '../../../model/klant-type';
import {Klant} from '../../../model/klant';

@Component({
  selector: 'app-klant-dialog',
  templateUrl: './klant-dialog.component.html',
  styleUrls: ['./klant-dialog.component.scss']
})
export class KlantDialogComponent implements OnInit {

  public naam: string;

  constructor(public dialogRef: MatDialogRef<KlantDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public klant: Klant,
              private commandService: CommandService) {
  }

  ngOnInit() {
    if (this.klant) {
      this.naam = this.klant.naam;
    }
  }

  ok() {
    this.dialogRef.close('ok');
    if (this.klant) {
      this.commandService.wijzigKlant(this.klant.klantId, this.naam);
    } else {
      this.commandService.voegKlantToe(this.naam, KlantType.LID);
    }
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

}
