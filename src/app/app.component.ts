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
  timerLength: number;
  new: boolean = true;

  timeLeft() {
    let seconds: string = (this.sessionLength % 60).toString();
    let wholeMinutesLeftInSeconds = this.sessionLength - parseFloat(seconds);
    let minutes = (wholeMinutesLeftInSeconds / 60).toString();
    if (minutes.length === 1) minutes = `0${minutes}`;
    if (seconds.length === 1) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
  }

  reset() {
    this.sessionLength = 1500;
    this.breakLength = 300;
    this.timerLength = 1500;
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
      this.new = false;
    }
  }

  changeTimerState(): void {
    if (!this.timerStateRunning) {
      this.timerStateRunning = true;
      this.timer = setInterval(() => {
        this.timerLength -= 1;
        if (this.timerLength == 0 && this.currentState == 'Session') {
          this.timerLength == this.breakLength;
          this.currentState = 'Break';
        }
        if (this.timerLength == 0 && this.currentState == 'Break') {
          this.timerLength == this.sessionLength;
          this.currentState = 'Session';
        }
      }, 1000);
    } else {
      this.timerStateRunning = false;
      clearInterval(this.timer);
    }
  }
}
