import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacingDetailsComponent } from './racing-details.component';

describe('RacingDetailsComponent', () => {
  let component: RacingDetailsComponent;
  let fixture: ComponentFixture<RacingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
