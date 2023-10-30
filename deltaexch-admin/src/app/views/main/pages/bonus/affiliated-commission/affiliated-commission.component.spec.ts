import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatedCommissionComponent } from './affiliated-commission.component';

describe('AffiliatedCommissionComponent', () => {
  let component: AffiliatedCommissionComponent;
  let fixture: ComponentFixture<AffiliatedCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliatedCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliatedCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
