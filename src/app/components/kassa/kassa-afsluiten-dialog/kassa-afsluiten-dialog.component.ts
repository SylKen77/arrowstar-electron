import {Component, Inject, OnInit} from '@angular/core';
import {KassaService} from '../../../services/kassa-service';
import {KlantDialogComponent} from '../../home/klant-dialog/klant-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CommandService} from '../../../services/command-service';

@Component({
  selector: 'app-kassa-afsluiten-dialog',
  templateUrl: './kassa-afsluiten-dialog.component.html',
  styleUrls: ['./kassa-afsluiten-dialog.component.scss']
})
export class KassaAfsluitenDialogComponent implements OnInit {

  public bedrag: number;
  public opmerking: string;

  constructor(public dialogRef: MatDialogRef<KlantDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private commandService: CommandService,
              public kassaService: KassaService) { }

  ngOnInit() {
  }

  ok() {
    this.dialogRef.close('ok');
    this.commandService.voegKassaAfsluitingToe(this.bedrag, this.opmerking);
  }

}
