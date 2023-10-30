import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoPaymentComponent } from './crypto-payment.component';

describe('CryptoPaymentComponent', () => {
  let component: CryptoPaymentComponent;
  let fixture: ComponentFixture<CryptoPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
