import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLogService } from 'src/app/services/user-log.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-navbars',
  templateUrl: './navbars.component.html',
  styleUrls: ['./navbars.component.scss']
})
export class NavbarsComponent implements OnInit {
  menuToggle = false;
  sidebar: HTMLElement;
  overlay: HTMLElement;
  trying = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userLogService: UserLogService,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.sidebar = document.getElementById('aside');
    this.overlay = document.getElementById('overlay');

    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      if (window.innerWidth < 661) {
        const currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
          document.getElementById('navbar').style.top = '0';
        } else {
          document.getElementById('navbar').style.top = '-55px';
        }
        prevScrollpos = currentScrollPos;
      }
    };
  }

  onMenuButtonClick() {
    this.menuToggle = !this.menuToggle;
    if (this.menuToggle) {
      this.sidebar.classList.add('shown');
      this.overlay.classList.add('shown');
    } else {
      this.sidebar.classList.remove('shown');
      this.overlay.classList.remove('shown');
    }
  }

  async onChallengesShow() {
    this.trying = true;
    await this.mainService.getChallengesAPI().then(challenges => {
      this.mainService.pushChallenges(challenges);
    });
    await this.mainService.getGamesAPI().then(games => {
      this.mainService.pushGames(games);
    });
    this.trying = false;
    this.router.navigate(['challenges'], { relativeTo: this.route });
  }

  onUserProfileShow() {
    this.router.navigate(['home/profile'])
  }

  onLogout() {
    this.userLogService.logout(true)
  }
}
