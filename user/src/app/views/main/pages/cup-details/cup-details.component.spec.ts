import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupDetailsComponent } from './cup-details.component';

describe('CupDetailsComponent', () => {
  let component: CupDetailsComponent;
  let fixture: ComponentFixture<CupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
