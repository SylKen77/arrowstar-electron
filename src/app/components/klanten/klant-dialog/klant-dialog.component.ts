import {ApplicationRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CommandService} from '../../../services/command-service';
import {KlantType} from '../../../model/klant-type';
import {Klant} from '../../../model/klant';
import {ImageService} from '../../../services/image-service';
import {Image} from '../../../model/image';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-klant-dialog',
  templateUrl: './klant-dialog.component.html',
  styleUrls: ['./klant-dialog.component.css']
})
export class KlantDialogComponent implements OnInit {

  public naam: string;
  public tempAvatar: string;
  private avatarImage: Image;

  constructor(public dialogRef: MatDialogRef<KlantDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public klant: Klant,
              private commandService: CommandService,
              private imageService: ImageService,
              private applicationRef: ApplicationRef,
              public _DomSanitizationService: DomSanitizer) {
  }

  ngOnInit() {
    if (this.klant) {
      this.naam = this.klant.naam;
    }
  }

  ok() {
    this.dialogRef.close('ok');
    if (this.klant) {
      this.commandService.wijzigKlant(this.klant.klantId, this.naam);
      if (this.avatarImage) {
        console.log('saving avatar...');
        this.imageService.saveAvatar(this.klant.klantId, this.avatarImage);
      }
    } else {
      const klantId = this.commandService.voegKlantToe(this.naam, KlantType.LID);
      if (this.avatarImage) {
        console.log('saving avatar...');
        this.imageService.saveAvatar(klantId, this.avatarImage);
      }
    }
  }

  heeftTempAvatar(): boolean {
    return !!this.tempAvatar;
  }

  changeAvatar() {
    this.imageService.kiesAvatar(avatarImage => {
      if (avatarImage) {
        this.setTempAvatar(avatarImage);
        this.applicationRef.tick();
      }
    });
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

  private setTempAvatar(avatar: Image) {
    this.avatarImage = avatar;
    this.tempAvatar = avatar.contentBase64;
  }

  heeftAvatar(klant: Klant): boolean {
    if (klant) return this.imageService.heeftAvatar(klant.klantId);
    return false;
  }

  getAvatarUrl(klantId: number) {
    return ImageService.getAvatarUrl(klantId);
  }

  getDefaultAvatarUrl(klant: Klant): string {
    if (klant && klant.naam) return ImageService.getDefaultAvatarUrl(klant.naam.charAt(0));
    if (this.naam) return ImageService.getDefaultAvatarUrl(this.naam.charAt(0));
    return ImageService.getDefaultKlantAvatar();
  }


}
