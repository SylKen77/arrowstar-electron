import {Component, Inject, OnInit} from '@angular/core';
import {KlantType} from '../../../model/klant-type';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CommandService} from '../../../services/command-service';

@Component({
  selector: 'app-klant-aanmaken-dialog',
  templateUrl: './klant-aanmaken-dialog.component.html',
  styleUrls: ['./klant-aanmaken-dialog.component.css']
})
export class KlantAanmakenDialogComponent implements OnInit {
  public naam: string;
  public voornaam: string;
  public klantType: KlantType = KlantType.GAST;

  public klantTypeEnum = KlantType;

  constructor(public dialogRef: MatDialogRef<KlantAanmakenDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private commandService: CommandService) {
  }

  ngOnInit(): void {
  }

  ok() {
    this.commandService.voegKlantToe(this.naam, this.voornaam, this.klantType);
    this.dialogRef.close('ok');
  }

  cancel() {
    this.dialogRef.close('cancel');
  }


}
