import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Challenge } from 'src/app/models/challenge.model';
import { MainService } from 'src/app/services/main.service';
import { Game } from 'src/app/models/game.model';
import { ScreenLayoutService } from 'src/app/services/screen-layout.service';
import { UserLogService } from 'src/app/services/user-log.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {
  challenge: Challenge;
  game: Game;
  deviceWidth: number;
  someNumber = 50;
  userUid: string;
  challengePath: string;
  isPlayerIn: boolean;
  playersNeeded: number;
  smallScreensCorrespondingHeader: string;
  bigScreensCorrespondingHeader: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService,
    private userLogServce: UserLogService,
    private screenLayoutService: ScreenLayoutService
  ) { }

  ngOnInit() {
    // Subscribe to screen width changes
    this.deviceWidth = window.innerWidth;
    this.screenLayoutService.deviceWidth.subscribe(width => {
      this.deviceWidth = width;
    });
    // See who this user is
    this.userUid = this.userLogServce.getUserUid();
    // Set challenge from the URL
    this.route.params.subscribe((params: Params) => {
      const challengeId = params['id'];
      this.challenge = this.mainService.getChallenge(challengeId);
      this.game = this.mainService.getGame(this.challenge.gameId);

      if (!this.challenge.isFilled) {
        //  Number of players needed to start gets shown
        if (this.challenge.players) {
          this.playersNeeded =
            this.game.playersLimit - Object.keys(this.challenge.players).length;
        }
      }
      //  Know if the user has subscribed to the challenge
      if (this.challenge.players) {
        for (const player of this.challenge.players) {
          this.isPlayerIn =
            this.userUid === player.uid ? true : false;
          if (this.isPlayerIn) {
            break;
          }
        }
      }
      // Assigning value to corresponding headers
      if (!this.challenge.isFilled && !this.isPlayerIn) {
        this.smallScreensCorrespondingHeader = 'اطلاعات';
        if (this.challenge.startTime === '') {
          this.bigScreensCorrespondingHeader = 'سایر اطلاعات';
        }
      } else if (this.challenge.startTime !== '') {
        this.smallScreensCorrespondingHeader = 'شمارش';
        this.bigScreensCorrespondingHeader = 'شمارش معکوس';
      } else if (
        !this.challenge.isFilled &&
        this.isPlayerIn &&
        this.challenge.startTime === ''
      ) {
        this.smallScreensCorrespondingHeader = 'نیازمندی';
        this.bigScreensCorrespondingHeader = 'تعداد بازیکن مورد نیاز ';
      }
    });
    this.challengePath = this.mainService.getChallengeFullUrl(
      this.challenge.id
    );
  }

  toFarsiNumber(n) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, x => farsiDigits[x]);
  }
  toNumber(object: Object) {
    if (object) {
      return Object.keys(object).length;
    } else return 0
  }

  challengeHasAlreadyStarted(startTime: string) {
    if (Date.parse(startTime) - Date.parse(new Date().toString()) <= 0) {
      return true;
    } else {
      return false;
    }
  }

  // Tabs operating on small screens
  openTab(evt, tabContentId: string) {
    let i: number,
      tabContent: HTMLCollectionOf<Element>,
      tabLinks: HTMLCollectionOf<Element>;
    tabContent = document.getElementsByClassName('tab-content');
    for (i = 0; i < tabContent.length; i++) {
      (<HTMLElement>tabContent[i]).style.display = 'none';
    }
    tabLinks = document.getElementsByClassName('tab-links');
    for (i = 0; i < tabLinks.length; i++) {
      tabLinks[i].className = tabLinks[i].className.replace(' active', '');
    }
    document.getElementById(tabContentId).style.display = 'block';
    evt.target.className += ' active';
  }

  signForTheChallenge() {
    if (!this.isPlayerIn) {
      this.userLogServce.signForTheChallenge(this.challenge.id, this.challenge.gameId);
    }
  }

  cancel() {
    this.router.navigate(['/home/challenges'])
  }
}
