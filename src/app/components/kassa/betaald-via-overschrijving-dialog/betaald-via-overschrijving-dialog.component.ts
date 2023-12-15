import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CommandService} from '../../../services/command-service';
import {AfrekeningViaOverschrijving} from '../../../model/afrekening-via-overschrijving';

@Component({
  selector: 'app-betaald-via-overschrijving-dialog',
  templateUrl: './betaald-via-overschrijving-dialog.component.html',
  styleUrls: ['./betaald-via-overschrijving-dialog.component.css']
})
export class BetaaldViaOverschrijvingDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BetaaldViaOverschrijvingDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AfrekeningViaOverschrijving,
              private commandService: CommandService) { }

  ngOnInit() {
  }

  ok() {
    this.dialogRef.close('ok');
    this.commandService.afrekeningViaOverschrijvingVerifieren(this.data.klant.klantId, this.data.datum, this.data.bedrag);
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

}
