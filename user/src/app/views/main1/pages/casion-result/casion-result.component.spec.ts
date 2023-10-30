import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasionResultComponent } from './casion-result.component';

describe('CasionResultComponent', () => {
  let component: CasionResultComponent;
  let fixture: ComponentFixture<CasionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasionResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
