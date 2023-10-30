import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketRollbackComponent } from './market-rollback.component';

describe('MarketRollbackComponent', () => {
  let component: MarketRollbackComponent;
  let fixture: ComponentFixture<MarketRollbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketRollbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketRollbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
