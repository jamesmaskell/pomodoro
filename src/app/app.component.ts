import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pomodoro';

  breakLength = 300;
  sessionLength = 1500;

  timeLeft() {
    let seconds: string = (this.sessionLength % 60).toString();
    let wholeMinutesLeftInSeconds = this.sessionLength - parseFloat(seconds);
    let minutes = (wholeMinutesLeftInSeconds / 60).toString();
    console.log(minutes, seconds.length);
    if (minutes.length === 1) `0${minutes}`;
    if (seconds.length === 1) `0 ${seconds}`;
    console.log(minutes, seconds.length);
    return `${minutes}:${seconds}`;
  }
}
