import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(({ mainData }) => {
      this.mainService.pushChallenges(mainData[0]);
      this.mainService.pushGames(mainData[1]);
      // this.mainService.pushMissions(mainData[2]);
      // console.log(mainData);
    });
  }
}
