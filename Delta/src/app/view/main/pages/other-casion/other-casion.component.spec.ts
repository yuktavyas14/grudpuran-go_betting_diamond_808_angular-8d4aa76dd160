import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherCasionComponent } from './other-casion.component';

describe('OtherCasionComponent', () => {
  let component: OtherCasionComponent;
  let fixture: ComponentFixture<OtherCasionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherCasionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherCasionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
