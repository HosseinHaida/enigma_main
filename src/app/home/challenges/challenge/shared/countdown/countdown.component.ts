import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input
} from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() startTime: string;
  @Input() showHelperText: boolean;
  timeinterval: any;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getCountdownElementsAndInitialize();
  }

  ngOnDestroy() {
    clearInterval(this.timeinterval);
  }

  getCountdownElementsAndInitialize() {
    if (this.startTime) {
      if (this.timeinterval) {
        clearInterval(this.timeinterval);
      }
      const deadline = new Date(Date.parse(this.startTime));
      const countdown = document.getElementById('countdown');
      this.initializecountdown(countdown, deadline);
    } else {
      return;
    }
  }

  getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date().toString());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  initializecountdown(countdown: HTMLElement, endtime: Date) {
    const daysSpan = countdown.querySelector('.days');
    const hoursSpan = countdown.querySelector('.hours');
    const minutesSpan = countdown.querySelector('.minutes');
    const secondsSpan = countdown.querySelector('.seconds');

    const updatecountdown = () => {
      const t = this.getTimeRemaining(endtime);
      if (t.total <= 0) {
        daysSpan.innerHTML = '00';
        hoursSpan.innerHTML = '00';
        minutesSpan.innerHTML = '00';
        secondsSpan.innerHTML = '00';
        clearInterval(this.timeinterval);
      } else {
        daysSpan.innerHTML = t.days.toString();
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        console.log('innerHTML changed!!');
      }
    };

    updatecountdown();
    this.timeinterval = setInterval(updatecountdown, 1000);
  }
}
