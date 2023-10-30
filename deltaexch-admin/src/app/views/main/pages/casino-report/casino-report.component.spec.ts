import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoReportComponent } from './casino-report.component';

describe('CasinoReportComponent', () => {
  let component: CasinoReportComponent;
  let fixture: ComponentFixture<CasinoReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasinoReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasinoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
