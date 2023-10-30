import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposureDetailComponent } from './exposure-detail.component';

describe('ExposureDetailComponent', () => {
  let component: ExposureDetailComponent;
  let fixture: ComponentFixture<ExposureDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExposureDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExposureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
