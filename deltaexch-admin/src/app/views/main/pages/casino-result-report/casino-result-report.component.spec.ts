import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoResultReportComponent } from './casino-result-report.component';

describe('CasinoResultReportComponent', () => {
  let component: CasinoResultReportComponent;
  let fixture: ComponentFixture<CasinoResultReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasinoResultReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasinoResultReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
