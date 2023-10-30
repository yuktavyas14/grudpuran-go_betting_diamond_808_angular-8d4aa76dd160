import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GgrReportComponent } from './ggr-report.component';

describe('GgrReportComponent', () => {
  let component: GgrReportComponent;
  let fixture: ComponentFixture<GgrReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GgrReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GgrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
