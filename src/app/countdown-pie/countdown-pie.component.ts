import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown-pie',
  templateUrl: './countdown-pie.component.html',
  styleUrls: ['./countdown-pie.component.scss'],
})
export class CountdownPieComponent implements OnInit {
  origTotalTime: number;
  currentTime: number;

  constructor() {}

  ngOnInit(): void {}

  getCountdownPieStyle() {
    let deg: number;
    // The left half of the pie always needs to be TOMATO coloured
    let linearGradientStyle: string =
      'linear-gradient(90deg, #ff6347 50%, transparent 50%)';

    // If timer currently has more than half the time to go....
    if (this.currentTime > this.origTotalTime / 2) {
      // Add another 'half moon' in TOMATO.
      // change angle of half moon so that it 'moves' clockwise as the timer counts down so that it looks like the pie slice is getting bigger
      deg =
        90 +
        (360 / this.origTotalTime) * (this.origTotalTime - this.currentTime);
      linearGradientStyle =
        `linear-gradient(${deg}deg, transparent 50%, #ff6347 50%), ` +
        linearGradientStyle;
    }
    // if timer has gone over half....
    else if (this.currentTime < this.origTotalTime / 2) {
      // Add another 'half moon' in the same colour as the background color.
      // change angle of half moon so that it 'moves' clockwise as the timer counts down so that it covers the first half.
      deg =
        90 +
        (360 / this.origTotalTime) *
          (this.origTotalTime - this.currentTime - this.origTotalTime / 2);
      linearGradientStyle =
        `linear-gradient(${deg}deg, transparent 50%, rgb(21, 27, 41) 50%), ` +
        linearGradientStyle;
    } else if (this.currentTime == 0) {
      linearGradientStyle = 'none';
    }

    return { 'background-image': linearGradientStyle };
  }
}
