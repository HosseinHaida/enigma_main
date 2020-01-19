import { Component, OnInit, Input } from '@angular/core';
import { UserLogService } from 'src/app/services/user-log.service';

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
  @Input() playersList: any;
  @Input() showHeader: boolean;
  players: any;
  fetchingUsersStatus: string;

  constructor(private userLogService: UserLogService) { }

  ngOnInit() {
    // console.log(this.playersList)
    if (this.playersList) {
      const thisthis = this
      const array = []
      Object.keys(this.playersList).map(function (playerNamedIndex) {
        const playerId = thisthis.playersList[playerNamedIndex].uid
        array.push(playerId)
      })

      this.fetchingUsersStatus = 'trying';
      this.userLogService.getUsers(array).subscribe((fetchedUsers: { usersToBeSent }) => {
        // console.log(fetchedUsers.usersToBeSent)
        thisthis.fetchingUsersStatus = null;
        thisthis.players = fetchedUsers.usersToBeSent
      },
        error => {
          console.log(error)
          thisthis.players = []
          thisthis.fetchingUsersStatus = 'failure';
        })
    }

  }
}
