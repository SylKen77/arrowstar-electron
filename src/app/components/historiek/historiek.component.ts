import {Component, OnInit} from '@angular/core';
import {StateService} from '../../services/state-service';


@Component({
  selector: 'app-historiek',
  templateUrl: './historiek.component.html',
  styleUrls: ['./historiek.component.css']
})
export class HistoriekComponent implements OnInit {

  constructor(public stateService: StateService) {
  }

  ngOnInit() {
  }

}
