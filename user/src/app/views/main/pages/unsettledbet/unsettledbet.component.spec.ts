import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsettledbetComponent } from './unsettledbet.component';

describe('UnsettledbetComponent', () => {
  let component: UnsettledbetComponent;
  let fixture: ComponentFixture<UnsettledbetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsettledbetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsettledbetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
