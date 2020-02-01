import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//  RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//  Models
import { Game } from '../models/game.model';
import { Mission } from '../models/mission.model';
import { Challenge } from '../models/challenge.model';

@Injectable()
export class MainService {
  // connection = ' http://localhost:3000/';
  connection = 'https://us-central1-enigma-ng.cloudfunctions.net/api';
  // challengesRootPath = 'http://localhost:4200/home/challenges/';
  challengesRootPath = 'https://us-central1-enigma-ng.cloudfunctions.net/api/challenges';
  challenges: Challenge[];
  missions: Mission[];
  games: Game[];

  constructor(private http: HttpClient) { }

  getInvitationCode() {
    return 'CrackerJoe7_888';
  }

  getChallengesAPI(): Promise<Challenge[]> {
    return <Promise<Challenge[]>>this.http.get(this.connection + '/challenges').toPromise().then((object: { challenges, proto }) => {
      return object.challenges
    },
      error => {
        console.log(error)
      });
  }
  pushChallenges(challenges: Challenge[]) {
    this.challenges = challenges;
  }
  getChallenges() {
    return [...this.challenges];
  }
  getChallenge(id: string): Challenge {
    return this.challenges.find(challenge => {
      return challenge.id === id;
    });
  }
  getChallengeFullUrl(id: string) {
    return this.challengesRootPath + id;
  }
  getGamesAPI(): Promise<Game[]> {
    return <Promise<Game[]>>this.http.get(this.connection + '/games').toPromise().then((object: { games, proto }) => {
      return object.games
    },
      error => {
        console.log(error)
      });
  }
  pushGames(games: Game[]) {
    this.games = games;
  }
  getGame(id: string): Game {
    let gameToReturn;
    this.games.forEach(game => {
      if (game.id === id) {
        gameToReturn = game;
      }
    });
    return gameToReturn;
  }
  getGames() {
    return [...this.games];
  }
  getChallengeMissions(cid: string) {
    return this.http.get(this.connection + '/missions_of/' + cid)
  }

  isAnswerCorrect(mid: string, cid: string, answer: string) {
    return this.http.post(this.connection + '/missions/' + mid + '/' + cid + '/check_answer', answer)
  }

  setFinishTime(cid: string) {
    return this.http.post(this.connection + '/leaderboard', cid)
  }

  getLeaderboard(cid: string) {
    return this.http.get(this.connection + '/leaderboard/' + cid)
  }
}
