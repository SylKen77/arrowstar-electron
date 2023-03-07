import {Component, OnInit} from '@angular/core';
import {HistoriekService} from '../../services/historiek-service';


@Component({
  selector: 'app-historiek',
  templateUrl: './historiek.component.html',
  styleUrls: ['./historiek.component.css']
})
export class HistoriekComponent implements OnInit {

  constructor(public historiekService: HistoriekService) {
  }

  ngOnInit() {
  }

}
