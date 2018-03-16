import {Component, OnInit} from '@angular/core';
import {KlantService} from '../../services/klant-service';
import {CommandService} from '../../services/command-service';
import {ProductService} from '../../services/product-service';
import {KassaService} from '../../services/kassa-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public klantService: KlantService, public productService: ProductService, private commandService: CommandService, public kassaService: KassaService) {
  }

  ngOnInit() {
  }

  klantAanmaken() {
    this.commandService.voegKlantToe('De Cock', 'Maarten', 'LID');
  }
}
