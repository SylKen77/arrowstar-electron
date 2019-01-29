import {Component, OnInit} from '@angular/core';
import {KlantService} from '../../services/klant-service';
import {CommandService} from '../../services/command-service';

@Component({
  selector: 'app-klanten',
  templateUrl: './klanten.component.html',
  styleUrls: ['./klanten.component.scss']
})
export class KlantenComponent implements OnInit {

  constructor(public klantService: KlantService, public commandService: CommandService) {}

  ngOnInit(): void {
  }

  moveKlantUp(klantId: number) {
    console.log('moveKlantUp', klantId);
    this.commandService.zetKlantOmhoog(klantId);
  }

  moveKlantDown(klantId: number) {
    console.log('moveKlantDown', klantId);
    this.commandService.zetKlantOmlaag(klantId);
  }

  deleteKlant(klantId: number) {
    console.log('moveKlantDown', klantId);
    this.commandService.deleteKlant(klantId);
  }
}
