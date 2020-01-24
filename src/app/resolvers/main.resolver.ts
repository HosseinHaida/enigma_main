import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

//  RXJS imports
import { Observable, forkJoin } from 'rxjs';

//  Models
import { Challenge } from '../models/challenge.model';
// import { Mission } from '../models/mission.model';
import { Game } from '../models/game.model';

// Main Service
import { MainService } from '../services/main.service';

export class MainResolver implements Resolve<[Challenge[], Game[],
  // Mission[]
]> {
  constructor(private mainService: MainService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<[Challenge[], Game[],
    // Mission[]
  ]> {
    return forkJoin(
      this.mainService.getChallengesAPI(),
      this.mainService.getGamesAPI()
      // this.mainService.getMissionsAPI()
    );
  }
}
