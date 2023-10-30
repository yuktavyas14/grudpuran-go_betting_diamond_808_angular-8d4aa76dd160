import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTypeListComponent } from './game-type-list.component';

describe('GameTypeListComponent', () => {
  let component: GameTypeListComponent;
  let fixture: ComponentFixture<GameTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
