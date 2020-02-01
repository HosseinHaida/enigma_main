import { Component, OnInit, Input } from '@angular/core';
import { UserLogService } from 'src/app/services/user-log.service';
import { MainService } from 'src/app/services/main.service';

interface Player {
  level: number;
  uid: string;
  photoURL: string;
  username: string;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  @Input() playersList: any
  @Input() showHeader: boolean
  @Input() cid: string
  players: any
  fetchingUsersStatus: string
  leaderboard: { uid: string, status: number }[]

  constructor(
    private userLogService: UserLogService,
    private mainService: MainService
  ) { }

  ngOnInit() {
    if (this.playersList) {
      const thisthis = this
      const array = []
      Object.keys(this.playersList).map(function (playerNamedIndex) {
        const playerId = thisthis.playersList[playerNamedIndex].uid
        array.push(playerId)
      })

      this.fetchingUsersStatus = 'trying';
      this.userLogService.getUsers(array).subscribe((fetchedUsers: { usersToBeSent }) => {
        thisthis.fetchingUsersStatus = null;
        thisthis.players = fetchedUsers.usersToBeSent
      },
        error => {
          console.log(error)
          thisthis.players = []
          thisthis.fetchingUsersStatus = 'failure';
        })
      this.mainService.getLeaderboard(this.cid).subscribe((res: { leaderboard: [] }) => {
        this.leaderboard = res.leaderboard
        console.log(this.leaderboard)
      }, (error) => {
        this.leaderboard = [];
        console.log(error)
      })
    }
  }
  // showFinishDate(timestamp: string) {
  //   return new Date(Number(timestamp))
  // }
}
