import { Component, OnInit, Input } from '@angular/core';
import QRCode from 'qrcode';
import { Url } from 'url';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  @Input() instancePath: string;
  @Input() instanceName: string;
  @Input() showLink: boolean;
  @Input() isPlayerIn: boolean;
  invitationCode: string;
  qrCode: Url;

  constructor(private mainService: MainService) {}

  ngOnInit() {
    QRCode.toDataURL(this.instancePath)
      .then(url => {
        this.qrCode = url;
      })
      .catch(err => {
        console.error(err);
      });
    if (this.isPlayerIn) {
      this.invitationCode = this.mainService.getInvitationCode();
    }
  }
}
