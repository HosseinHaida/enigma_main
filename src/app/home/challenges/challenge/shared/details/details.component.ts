import { Component, OnInit, Input } from '@angular/core';
import { INFERRED_TYPE } from '@angular/compiler/src/output/output_ast';
import { Challenge } from 'src/app/models/challenge.model';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() leftColumn: boolean;
  @Input() rightColumn: boolean;
  @Input() extraContentLeft: boolean;
  @Input() extraContentRight: boolean;
  @Input() isPlayerIn: boolean;
  @Input() challenge: Challenge;
  @Input() game: Game;
  numberOfNeededPlayers: Number;

  constructor() { }

  ngOnInit() {
    if (this.challenge.players) {
      this.numberOfNeededPlayers = this.game.playersLimit - Object.keys(this.challenge.players).length
    } else {
      this.numberOfNeededPlayers = this.game.playersLimit
    }
  }

  // toFarsiNumber(n) {
  //   const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  //   return n.toString().replace(/\d/g, x => farsiDigits[x]);
  // }

  toNumber(object: Object) {
    if (object) {
      return Object.keys(object).length;
    } else return 0
  }
}
