import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposurDetailsComponent } from './exposur-details.component';

describe('ExposurDetailsComponent', () => {
  let component: ExposurDetailsComponent;
  let fixture: ComponentFixture<ExposurDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExposurDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExposurDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
