import { Subject } from 'rxjs';
import { OnInit } from '@angular/core';

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
