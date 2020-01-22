import { Component, OnInit } from '@angular/core';
import { ScreenLayoutService } from 'src/app/services/screen-layout.service';
import { UserLogService } from 'src/app/services/user-log.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  deviceWidth: Number;
  avatarsURLList = [
    'https://cdn3.iconfinder.com/data/icons/flat-avatars-3/512/Flat_avatars_svg-01-512.png',
    'https://cdn3.iconfinder.com/data/icons/flat-avatars-3/512/Flat_avatars_svg-02-512.png',
    'https://cdn3.iconfinder.com/data/icons/flat-avatars-3/512/Flat_avatars_svg-03-512.png',
    'https://cdn3.iconfinder.com/data/icons/flat-avatars-3/512/Flat_avatars_svg-04-512.png',
    'https://cdn3.iconfinder.com/data/icons/flat-avatars-3/512/Flat_avatars_svg-05-512.png',
    'https://cdn3.iconfinder.com/data/icons/flat-avatars-3/512/Flat_avatars_svg-06-512.png',
    'https://cdn3.iconfinder.com/data/icons/flat-avatars-3/512/Flat_avatars_svg-07-512.png',
    'https://cdn3.iconfinder.com/data/icons/flat-avatars-3/512/Flat_avatars_svg-08-512.png',
    'https://cdn3.iconfinder.com/data/icons/flat-avatars-3/512/Flat_avatars_svg-09-512.png',
    'https://cdn3.iconfinder.com/data/icons/flat-avatars-3/512/Flat_avatars_svg-10-512.png'
  ];
  player: any;


  constructor(
    private screenLayoutService: ScreenLayoutService,
    private userLogService: UserLogService
  ) { }

  ngOnInit() {
    // Subscribe to screen width changes
    this.deviceWidth = window.innerWidth;
    this.screenLayoutService.deviceWidth.subscribe(width => {
      this.deviceWidth = width;
    });
    // Get Player
    this.userLogService.getUsers([this.userLogService.getUserUid()]).subscribe((res: { usersToBeSent: {} }) => {
      this.player = res.usersToBeSent[0];
      // document.documentElement.style.setProperty(`--${'configs'}`, value + suffix);
      console.log(this.player)
    });
  }

}
