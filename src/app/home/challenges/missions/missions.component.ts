import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { Mission } from 'src/app/models/mission.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {
  missions: Mission[];
  answer: string;

  constructor(private route: ActivatedRoute, private mainService: MainService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const cid = params['id']
      this.mainService.getChallengeMissions(cid).subscribe((res: { missions: Mission[] }) => {
        this.missions = res.missions
        console.log(this.missions)
      });
    })
  }

  sanitize(html: string) {
    const script = this.sanitizer.bypassSecurityTrustHtml(html)
    return script
  }

  onCheckAnswer() {
    // this.mainService.isAnswerCorrect()

  }
}
