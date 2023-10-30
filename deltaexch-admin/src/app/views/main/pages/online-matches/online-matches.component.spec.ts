import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineMatchesComponent } from './online-matches.component';

describe('OnlineMatchesComponent', () => {
  let component: OnlineMatchesComponent;
  let fixture: ComponentFixture<OnlineMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
