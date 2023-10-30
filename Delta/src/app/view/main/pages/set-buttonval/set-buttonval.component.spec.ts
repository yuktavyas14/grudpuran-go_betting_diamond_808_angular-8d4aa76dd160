import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetButtonvalComponent } from './set-buttonval.component';

describe('SetButtonvalComponent', () => {
  let component: SetButtonvalComponent;
  let fixture: ComponentFixture<SetButtonvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetButtonvalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetButtonvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
