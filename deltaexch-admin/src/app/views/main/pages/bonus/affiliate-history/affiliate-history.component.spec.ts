import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateHistoryComponent } from './affiliate-history.component';

describe('AffiliateHistoryComponent', () => {
  let component: AffiliateHistoryComponent;
  let fixture: ComponentFixture<AffiliateHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliateHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
