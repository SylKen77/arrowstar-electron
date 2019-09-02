import {Component, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './app.config';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  @ViewChild('sidenav') sidenav: MatSidenav;


  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);
  }

  close() {
    this.sidenav.close();
  }

}
