import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawStatementComponent } from './withdraw-statement.component';

describe('WithdrawStatementComponent', () => {
  let component: WithdrawStatementComponent;
  let fixture: ComponentFixture<WithdrawStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
