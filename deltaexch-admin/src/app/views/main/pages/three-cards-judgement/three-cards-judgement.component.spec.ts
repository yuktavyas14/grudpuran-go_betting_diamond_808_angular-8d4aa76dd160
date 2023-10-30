import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeCardsJudgementComponent } from './three-cards-judgement.component';

describe('ThreeCardsJudgementComponent', () => {
  let component: ThreeCardsJudgementComponent;
  let fixture: ComponentFixture<ThreeCardsJudgementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeCardsJudgementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeCardsJudgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
