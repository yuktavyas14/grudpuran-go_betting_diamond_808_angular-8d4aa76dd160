import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoMatchDetailsComponent } from './casino-match-details.component';

describe('CasinoMatchDetailsComponent', () => {
  let component: CasinoMatchDetailsComponent;
  let fixture: ComponentFixture<CasinoMatchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasinoMatchDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasinoMatchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
