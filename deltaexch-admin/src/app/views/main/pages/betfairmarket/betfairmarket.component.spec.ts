import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetfairmarketComponent } from './betfairmarket.component';

describe('BetfairmarketComponent', () => {
  let component: BetfairmarketComponent;
  let fixture: ComponentFixture<BetfairmarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetfairmarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetfairmarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
