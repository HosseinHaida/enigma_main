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

  constructor() {}

  ngOnInit() {}

  toFarsiNumber(n) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, x => farsiDigits[x]);
  }
  toNumber(object: Object) {
    return Object.keys(object).length;
  }
}
