import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScreenLayoutService } from 'src/app/services/screen-layout.service';
import { UserLogService } from 'src/app/services/user-log.service';
import { Router } from '@angular/router';

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
  profileForm: FormGroup;
  selectedAvatar: string;


  constructor(
    private screenLayoutService: ScreenLayoutService,
    private userLogService: UserLogService,
    private router: Router
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
      this.profileForm = new FormGroup({
        username: new FormControl(this.player.username, Validators.required),
        email: new FormControl(this.player.email, Validators.required)
      });
      // console.log(this.player)
    });
  }

  onSubmit() {
    const newProfileConfig = {
      photoURL: this.player.photoURL,
      displayName: this.profileForm.value['username'],
      email: this.profileForm.value['email']
    };

    this.userLogService.updateUser(newProfileConfig)
  }

  onCancel() {
    this.router.navigate(['/home/challenges'])
  }

}
