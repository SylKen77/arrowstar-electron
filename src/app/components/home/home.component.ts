import {Component, OnInit} from '@angular/core';
import {ElectronService} from '../../providers/electron.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private electronService: ElectronService) {
  }

  ngOnInit() {
  }

  public writeLine() {
    console.log('HomeComponent.writeLine');
    this.electronService.writeLine({naam: 'Maarten'});
  }

  public readLines() {
    console.log('HomeComponent.readLines');
    this.electronService.readLines();
  }
}
