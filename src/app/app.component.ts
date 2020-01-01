import { Component, OnInit } from '@angular/core';
import { UserLogService } from './services/user-log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'home';
  constructor(private userLogService: UserLogService) { }
  ngOnInit() {
    this.userLogService.checkSignedUserStatusAndSignTheUnauthorizedOut();
  }
}
