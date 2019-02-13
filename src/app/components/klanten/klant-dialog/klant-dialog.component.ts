import {ApplicationRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CommandService} from '../../../services/command-service';
import {KlantType} from '../../../model/klant-type';
import {Klant} from '../../../model/klant';
import {ImageService} from '../../../services/image-service';
import {Image} from '../../../model/image';

@Component({
  selector: 'app-klant-dialog',
  templateUrl: './klant-dialog.component.html',
  styleUrls: ['./klant-dialog.component.scss']
})
export class KlantDialogComponent implements OnInit {

  public naam: string;
  public avatar: string;
  private avatarImage: Image;

  constructor(public dialogRef: MatDialogRef<KlantDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public klant: Klant,
              private commandService: CommandService,
              private imageService: ImageService,
              private applicationRef: ApplicationRef) {
  }

  ngOnInit() {
    if (this.klant) {
      this.naam = this.klant.naam;
      if (this.imageService.heeftAvatar(this.klant.klantId)) {
        this.setAvatar(this.imageService.getAvatar('' + this.klant.klantId));
      }
    }
  }

  ok() {
    this.dialogRef.close('ok');
    if (this.klant) {
      this.commandService.wijzigKlant(this.klant.klantId, this.naam);
      if (this.avatarImage) {
        this.imageService.saveAvatar(this.klant.klantId, this.avatarImage);
      }
    } else {
      console.log('ok: ' + this.naam);
      const klantId = this.commandService.voegKlantToe(this.naam, KlantType.LID);
      if (this.avatarImage) {
        this.imageService.saveAvatar(klantId, this.avatarImage);
      }
    }
  }

  changeAvatar() {
    this.imageService.kiesAvatar(avatarImage => {
      if (avatarImage) {
        this.setAvatar(avatarImage);
        this.applicationRef.tick();
      }
    });
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

  private setAvatar(avatar: Image) {
    this.avatarImage = avatar;
    this.avatar = avatar.contentBase64;
  }

  heeftAvatar(klant: Klant): boolean {
    if (klant) return this.imageService.heeftAvatar(klant.klantId);
    return false;
  }


}
