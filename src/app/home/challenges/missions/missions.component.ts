import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { Mission } from 'src/app/models/mission.model';
import { DomSanitizer } from '@angular/platform-browser';
import { UserLogService } from 'src/app/services/user-log.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {
  missions: Mission[];
  answer: any;
  result: Array<string>;
  cid: string;
  answeredArray: Array<string>;

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    private sanitizer: DomSanitizer,
    private userlogService: UserLogService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.cid = params['id']
      let array = [];
      this.mainService.getChallengeMissions(this.cid).subscribe((res: { missions: Mission[] }) => {
        this.missions = res.missions
        const currentUserId = this.userlogService.getUserUid();
        this.missions.forEach(mission => {
          if (mission.answered) {
            Object.keys(mission.answered).map((answeredNamedIndex) => {
              const playerId = mission.answered[answeredNamedIndex].uid
              const challengeId = mission.answered[answeredNamedIndex].cid
              if (challengeId === this.cid && playerId === currentUserId) {
                array.push(mission.id)
              }
            })
          }
        })
        this.answer = new Array(this.missions.length)
        this.result = new Array(this.missions.length)
        this.answeredArray = array;
      });
    })
  }

  sanitize(html: string) {
    const script = this.sanitizer.bypassSecurityTrustHtml(html)
    return script
  }

  checkIfIsAnswered(mid: string) {
    return this.answeredArray.includes(mid)
  }

  onCheckAnswer(mid: string, index: number) {
    this.result[index] = 'trying';
    this.mainService.isAnswerCorrect(mid, this.cid, this.answer[index]).subscribe((res: { result: boolean }) => {
      if (res.result === true) {
        this.answeredArray.push(mid);
        if (this.answeredArray.length === this.missions.length) {
          this.mainService.setFinishTime(this.cid).subscribe(() => {
            this.router.navigate(['../'], { relativeTo: this.route })
          });
        }
        this.result[index] = ''
      }
      else if (res.result === false) { this.result[index] = 'failed' }
    },
      (err) => {
        this.result[index] = 'failed'
      })
  }
}
