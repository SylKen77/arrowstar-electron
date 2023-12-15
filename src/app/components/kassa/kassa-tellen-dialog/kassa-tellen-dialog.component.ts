import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RekeningDialogComponent} from '../../home/rekening-dialog/rekening-dialog.component';
import {CommandService} from '../../../services/command-service';

@Component({
  selector: 'app-kassa-tellen-dialog',
  templateUrl: './kassa-tellen-dialog.component.html',
  styleUrls: ['./kassa-tellen-dialog.component.css']
})
export class KassaTellenDialogComponent implements OnInit {

  public eenCentAantal: number;
  public tweeCentAantal: number;
  public vijfCentAantal: number;
  public tienCentAantal: number;
  public twintigCentAantal: number;
  public vijftigCentAantal: number;
  public eenEuroAantal: number;
  public tweeEuroAantal: number;
  public vijfEuroAantal: number;
  public tienEuroAantal: number;
  public twintigEuroAantal: number;
  public vijftigEuroAantal: number;

  public opmerking: string;

  constructor(public dialogRef: MatDialogRef<RekeningDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private commandService: CommandService) { }

  ngOnInit() {
  this.eenCentAantal = 0;
    this.tweeCentAantal = 0;
    this.vijfCentAantal = 0;
    this.tienCentAantal = 0;
    this.twintigCentAantal = 0;
    this.vijftigCentAantal = 0;
    this.eenEuroAantal = 0;
    this.tweeEuroAantal = 0;
    this.vijfEuroAantal = 0;
    this.tienEuroAantal = 0;
    this.twintigEuroAantal = 0;
    this.vijftigEuroAantal = 0;
  }

  ok() {
    this.dialogRef.close('ok');
    this.commandService.voegKassaTellingToe(this.totaal(), this.opmerking);
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

  public totaal() {
    // noinspection PointlessArithmeticExpressionJS
    return this.eenCentAantal * 0.01
      + this.tweeCentAantal * 0.02
    + this.vijfCentAantal * 0.05
    + this.tienCentAantal * 0.1
    + this.twintigCentAantal * 0.2
    + this.vijftigCentAantal * 0.5
    + this.eenEuroAantal * 1
    + this.tweeEuroAantal * 2
    + this.vijfEuroAantal * 5
    + this.tienEuroAantal * 10
    + this.twintigEuroAantal * 20
    + this.vijftigEuroAantal * 50;
  }
}
