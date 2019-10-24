import { Component, OnInit, Input } from '@angular/core';

interface Player {
  level: number;
  username: string;
  avatar: string;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  @Input() players: Player[];
  @Input() showHeader: boolean;

  constructor() {}

  ngOnInit() {}
}
