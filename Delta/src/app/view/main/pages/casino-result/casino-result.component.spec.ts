import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoResultComponent } from './casino-result.component';

describe('CasinoResultComponent', () => {
  let component: CasinoResultComponent;
  let fixture: ComponentFixture<CasinoResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasinoResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasinoResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
