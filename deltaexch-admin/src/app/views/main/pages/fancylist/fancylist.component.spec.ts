import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FancylistComponent } from './fancylist.component';

describe('FancylistComponent', () => {
  let component: FancylistComponent;
  let fixture: ComponentFixture<FancylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FancylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FancylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
