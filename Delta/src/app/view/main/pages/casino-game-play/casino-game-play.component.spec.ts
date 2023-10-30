import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoGamePlayComponent } from './casino-game-play.component';

describe('CasinoGamePlayComponent', () => {
  let component: CasinoGamePlayComponent;
  let fixture: ComponentFixture<CasinoGamePlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasinoGamePlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasinoGamePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
