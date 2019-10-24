import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//  RXJS
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//  Models
import { Game } from '../models/game.model';
import { Mission } from '../models/mission.model';
import { Challenge } from '../models/challenge.model';

@Injectable()
export class MainService {
  connection = ' http://localhost:3000/';
  challengesRootPath = 'http://localhost:4200/home/challenges/';
  challenges: Challenge[];
  missions: Mission[];
  games: Game[];

  constructor(private http: HttpClient) {}

  getInvitationCode() {
    return 'CrackerJoe7_888';
  }

  getChallengesAPI(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.connection + 'challenges').pipe(
      map(challengesData => {
        return challengesData.map(challenge => {
          return {
            id: challenge.id,
            gameId: challenge.gameId,
            gameName: '', //  later gets value
            gamePhotoPath: '', // later gets value
            slug: challenge.slug,
            progress: challenge.progress,
            isFilled: challenge.isFilled,
            startTime: challenge.startTime,
            players: challenge.players
          };
        });
      })
    );
  }
  pushChallenges(challenges: Challenge[]) {
    this.challenges = challenges;
  }
  getChallenges() {
    return [...this.challenges];
  }
  getChallenge(id: number): Challenge {
    return this.challenges.find(challenge => {
      return challenge.id === id;
    });
  }
  getChallengeFullUrl(id: number) {
    return this.challengesRootPath + id;
  }
  getGamesAPI() {
    return this.http.get<Game[]>(this.connection + 'games').pipe(
      map(gamesData => {
        return gamesData.map(game => {
          return {
            id: game.id,
            userId: game.userId,
            name: game.name,
            level: game.level,
            playersLimit: game.playersLimit,
            city: game.city,
            region: game.region,
            cost: game.cost,
            prize: game.prize,
            missions: game.missions,
            photoPath: game.photoPath
          };
        });
      })
    );
  }
  pushGames(games: Game[]) {
    this.games = games;
  }
  getGame(id: number): Game {
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
  getMissionsAPI() {
    return this.http.get<Mission[]>(this.connection + 'missions').pipe(
      map(missionsData => {
        return missionsData.map(mission => {
          return {
            id: mission.id,
            level: mission.level,
            name: mission.name,
            photoPath: mission.photoPath,
            slug: mission.slug,
            script: mission.script,
            key: mission.key
          };
        });
      })
      // ,
      // catchError(err => {
      //   if (err.status === 404) {
      //     console.log('404 file not found!!');
      //     return;
      //   } else {
      //     return err;
      //   }
      // })
    );
  }
  pushMissions(missions: Mission[]) {
    this.missions = missions;
  }
}
