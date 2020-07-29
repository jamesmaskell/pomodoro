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
    let wholeMinutesLeftInSeconds = this.timerLength - parseFloat(seconds);
    let minutes = (wholeMinutesLeftInSeconds / 60).toString();
    if (minutes.length === 1) minutes = `0${minutes}`;
    if (seconds.length === 1) seconds = `0${seconds}`;
    console.log(`${minutes}:${seconds}`);
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
  }

  changeTimerState(): void {
    this.new = false;

    console.log(this.timerStateRunning);

    if (!this.timerStateRunning) {
      console.log('run');
      this.timerStateRunning = true;
      this.timer = setInterval(() => {
        this.timerLength -= 1;
        if (this.timerLength == -1 && this.currentState == 'Session') {
          this.timerLength = this.breakLength;
          this.currentState = 'Break';
        }
        if (this.timerLength == -1 && this.currentState == 'Break') {
          this.timerLength = this.sessionLength;
          this.currentState = 'Session';
        }
        this.timeLeft();
      }, 250);
    } else {
      this.timerStateRunning = false;
      clearInterval(this.timer);
    }

    console.log(this.timerStateRunning);
  }
}
