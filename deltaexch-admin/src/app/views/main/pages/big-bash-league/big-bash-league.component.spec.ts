import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigBashLeagueComponent } from './big-bash-league.component';

describe('BigBashLeagueComponent', () => {
  let component: BigBashLeagueComponent;
  let fixture: ComponentFixture<BigBashLeagueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigBashLeagueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigBashLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
