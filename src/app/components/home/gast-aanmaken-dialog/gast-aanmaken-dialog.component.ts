import {Component, Inject, OnInit} from '@angular/core';
import {KlantType} from '../../../model/klant-type';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CommandService} from '../../../services/command-service';

@Component({
  selector: 'app-klant-aanmaken-dialog',
  templateUrl: './gast-aanmaken-dialog.component.html',
  styleUrls: ['./gast-aanmaken-dialog.component.css']
})
export class GastAanmakenDialogComponent implements OnInit {

  public naam: string;

  constructor(public dialogRef: MatDialogRef<GastAanmakenDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private commandService: CommandService) {
  }

  ngOnInit(): void {
  }

  ok() {
    this.commandService.voegKlantToe(this.naam, KlantType.GAST);
    this.dialogRef.close('ok');
  }

  cancel() {
    this.dialogRef.close('cancel');
  }


}
