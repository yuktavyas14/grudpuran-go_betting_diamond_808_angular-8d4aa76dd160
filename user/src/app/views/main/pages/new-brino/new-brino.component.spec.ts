import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBrinoComponent } from './new-brino.component';

describe('NewBrinoComponent', () => {
  let component: NewBrinoComponent;
  let fixture: ComponentFixture<NewBrinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBrinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBrinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
