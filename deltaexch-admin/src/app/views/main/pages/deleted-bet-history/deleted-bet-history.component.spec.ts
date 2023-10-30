import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedBetHistoryComponent } from './deleted-bet-history.component';

describe('DeletedBetHistoryComponent', () => {
  let component: DeletedBetHistoryComponent;
  let fixture: ComponentFixture<DeletedBetHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedBetHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedBetHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
