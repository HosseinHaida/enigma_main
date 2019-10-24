import { Component, OnInit, Input } from '@angular/core';
import { Challenge } from 'src/app/models/challenge.model';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.scss']
})
export class ExtrasComponent implements OnInit {
  @Input() challenge: Challenge;
  @Input() isPlayerIn: boolean;
  @Input() playersNeeded: number;
  @Input() correspondingHeader: string;
  @Input() countdownsPermitted: boolean;
  @Input() showExtraContent: boolean;

  playersNeededArray: Array<number>;

  challengePath: string;

  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.challengePath = this.mainService.getChallengeFullUrl(
      this.challenge.id
    );
    this.playersNeededArray = Array(this.playersNeeded)
      .fill(0)
      .map((x, i) => i);
  }

  toFarsiNumber(n) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, x => farsiDigits[x]);
  }
  toNumber(object: Object) {
    return Object.keys(object).length;
  }
}
