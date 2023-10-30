import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndianfancyComponent } from './indianfancy.component';

describe('IndianfancyComponent', () => {
  let component: IndianfancyComponent;
  let fixture: ComponentFixture<IndianfancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndianfancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndianfancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
