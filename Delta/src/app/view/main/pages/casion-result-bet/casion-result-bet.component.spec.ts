import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasionResultBetComponent } from './casion-result-bet.component';

describe('CasionResultBetComponent', () => {
  let component: CasionResultBetComponent;
  let fixture: ComponentFixture<CasionResultBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasionResultBetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasionResultBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
