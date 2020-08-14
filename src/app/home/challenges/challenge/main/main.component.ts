import { Component, OnInit, Input } from '@angular/core';
import { Challenge } from 'src/app/models/challenge.model';
import { MainService } from 'src/app/services/main.service';
import { ScreenLayoutService } from 'src/app/services/screen-layout.service';
import { I18nPluralPipe } from '@angular/common';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Input() challenge: Challenge;
  @Input() game: Game;
  @Input() isPlayerIn: boolean;
  @Input() playersNeeded: number;
  @Input() countdownsPermitted: boolean;
  @Input() sharingSectionPermitted: boolean;

  playersNeededArray: Array<number>;

  toggleContentState = false;

  challengePath: string;
  deviceWidth: number;

  constructor(
    private mainService: MainService,
    private screenLayoutService: ScreenLayoutService
  ) { }

  ngOnInit() {
    this.deviceWidth = window.innerWidth;
    this.screenLayoutService.deviceWidth.subscribe(width => {
      this.deviceWidth = width;
    });
    this.challengePath = this.mainService.getChallengeFullUrl(
      this.challenge.id
    );
    this.playersNeededArray = Array(this.playersNeeded)
      .fill(0)
      .map((x, i) => i);
  }

  toggleContent(mode: boolean) {
    this.toggleContentState = mode;
    if (this.toggleContentState) {
      document.getElementById('share-toggle-button').classList.add('active');
      document.getElementById('info-toggle-button').classList.remove('active');
    } else {
      document.getElementById('info-toggle-button').classList.add('active');
      document.getElementById('share-toggle-button').classList.remove('active');
    }
  }

  // toFarsiNumber(n) {
  //   const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  //   return n.toString().replace(/\d/g, x => farsiDigits[x]);
  // }
  toNumber(object: Object) {
    return Object.keys(object).length;
  }
}
