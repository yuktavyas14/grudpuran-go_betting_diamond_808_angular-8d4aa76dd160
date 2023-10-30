import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatecodeComponent } from './affiliatecode.component';

describe('AffiliatecodeComponent', () => {
  let component: AffiliatecodeComponent;
  let fixture: ComponentFixture<AffiliatecodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliatecodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliatecodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
