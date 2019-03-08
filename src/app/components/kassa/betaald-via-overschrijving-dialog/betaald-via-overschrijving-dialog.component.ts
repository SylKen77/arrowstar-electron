import {Component, Inject, OnInit} from '@angular/core';
import {KassaService} from '../../../services/kassa-service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CommandService} from '../../../services/command-service';
import {OnbetaaldeAankoopViaOverschrijving} from '../../../model/onbetaalde-aankoop-via-overschrijving';

@Component({
  selector: 'app-betaald-via-overschrijving-dialog',
  templateUrl: './betaald-via-overschrijving-dialog.component.html',
  styleUrls: ['./betaald-via-overschrijving-dialog.component.scss']
})
export class BetaaldViaOverschrijvingDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BetaaldViaOverschrijvingDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: OnbetaaldeAankoopViaOverschrijving,
              private commandService: CommandService,
              public kassaService: KassaService) { }

  ngOnInit() {
  }

  ok() {
    this.dialogRef.close('ok');
    this.commandService.onbetaaldeAankoopViaOverschrijvingAfrekenen(this.data.klant.klantId, this.data.product.productId);
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

}
