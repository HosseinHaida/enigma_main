import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { Challenge } from 'src/app/models/challenge.model';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {
  challenges: Challenge[];
  games: Game[];
  equivalentGames: any[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService
  ) {}

  ngOnInit() {
    this.challenges = this.mainService.getChallenges();
    this.games = this.mainService.getGames();

    this.equivalentGames = new Array<Object>();
    this.challenges.forEach(challenge => {
      for (const game of this.games) {
        if (challenge.gameId === game.id) {
          this.equivalentGames.push({
            id: challenge.id,
            slug: challenge.slug,
            players: Object.keys(challenge.players).length,
            cost: game.cost
          });
        }
      }
    });
  }

  onChallengeClick(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
