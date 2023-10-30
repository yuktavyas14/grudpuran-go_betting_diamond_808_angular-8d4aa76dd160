import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCasionSlotComponent } from './live-casion-slot.component';

describe('LiveCasionSlotComponent', () => {
  let component: LiveCasionSlotComponent;
  let fixture: ComponentFixture<LiveCasionSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveCasionSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveCasionSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
