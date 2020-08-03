import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownPieComponent } from './countdown-pie.component';

describe('CountdownPieComponent', () => {
  let component: CountdownPieComponent;
  let fixture: ComponentFixture<CountdownPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountdownPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
