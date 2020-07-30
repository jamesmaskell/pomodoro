import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pomodoro';

  breakLength: number = 300;
  sessionLength: number = 1500;
  timerStateRunning: boolean = false;
  timer: any;
  currentState: string = 'Session';
  timerLength: number = 1500;
  new: boolean = true;
  timeLeftStr: string = '25:00';

  timeLeft() {
    let seconds: string = (this.timerLength % 60).toString();
    if (seconds.length === 1) seconds = `0${seconds}`;

    let wholeMinutesLeftInSeconds = this.timerLength - parseFloat(seconds);
    let minutes = (wholeMinutesLeftInSeconds / 60).toString();
    if (minutes.length === 1) minutes = `0${minutes}`;

    this.timeLeftStr = `${minutes}:${seconds}`;
  }

  reset() {
    if (this.timerStateRunning) this.changeTimerState();

    this.sessionLength = 1500;
    this.breakLength = 300;
    this.timerLength = 1500;
    this.currentState = 'Session';

    this.new = true;

    this.timeLeft();

    this.alarmHandler(document.getElementById('beep'), true);
  }

  changeTime(isBreak: boolean, diff: number) {
    isBreak ? (this.breakLength += diff) : (this.sessionLength += diff);

    this.breakLength < 60
      ? (this.breakLength = 60)
      : (this.breakLength = this.breakLength);

    this.sessionLength < 60
      ? (this.sessionLength = 60)
      : (this.sessionLength = this.sessionLength);

    this.breakLength > 3600
      ? (this.breakLength = 3600)
      : (this.breakLength = this.breakLength);

    this.sessionLength > 3600
      ? (this.sessionLength = 3600)
      : (this.sessionLength = this.sessionLength);

    if (this.new) {
      this.timerLength = this.sessionLength;
    }

    this.timeLeft();
  }

  changeTimerState(): void {
    this.new = false;
    if (!this.timerStateRunning) {
      this.timerStateRunning = true;
      this.timer = setInterval(() => {
        this.timerLength -= 1;
        if (this.timerLength == -1) {
          if (this.currentState == 'Session') {
            this.timerLength = this.breakLength;
            this.currentState = 'Break';
          } else {
            this.timerLength = this.sessionLength;
            this.currentState = 'Session';
          }
          this.alarmHandler(document.getElementById('beep'), false);
        }
        this.timeLeft();
      }, 1000);
    } else {
      this.timerStateRunning = false;
      clearInterval(this.timer);
    }
  }

  alarmHandler(element: HTMLElement, stop: boolean) {
    let audio = <HTMLAudioElement>element;
    if (!audio) return;

    if (stop) {
      audio.pause();
      audio.currentTime = 0;
    } else {
      audio.play();
    }
  }
}
