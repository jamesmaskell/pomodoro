import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-increment-button',
  templateUrl: './increment-button.component.html',
  styleUrls: ['./increment-button.component.scss'],
})
export class IncrementButtonComponent implements OnInit {
  @Input() maxValue: number;
  @Input() minValue: number;
  @Input() increment: number;
  @Input() elementId: string;
  @Input() elementLabel: string;

  constructor() {}

  ngOnInit(): void {}
}
