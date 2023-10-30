import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDepositListComponent } from './payment-deposit-list.component';

describe('PaymentDepositListComponent', () => {
  let component: PaymentDepositListComponent;
  let fixture: ComponentFixture<PaymentDepositListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentDepositListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDepositListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
