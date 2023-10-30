import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeButtonvalueComponent } from './change-buttonvalue.component';

describe('ChangeButtonvalueComponent', () => {
  let component: ChangeButtonvalueComponent;
  let fixture: ComponentFixture<ChangeButtonvalueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeButtonvalueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeButtonvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
