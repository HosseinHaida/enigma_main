import { Subject } from 'rxjs';
import { OnInit, Injectable } from '@angular/core';

@Injectable()
export class ScreenLayoutService implements OnInit {
  deviceWidth = new Subject<number>();

  constructor() {
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }
  ngOnInit() {
    this.deviceWidth.next(window.innerWidth);
  }

  onResize() {
    this.deviceWidth.next(window.innerWidth);
  }
}
