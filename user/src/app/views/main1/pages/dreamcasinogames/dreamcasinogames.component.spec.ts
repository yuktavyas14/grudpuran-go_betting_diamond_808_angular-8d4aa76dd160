import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DreamcasinogamesComponent } from './dreamcasinogames.component';

describe('DreamcasinogamesComponent', () => {
  let component: DreamcasinogamesComponent;
  let fixture: ComponentFixture<DreamcasinogamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DreamcasinogamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DreamcasinogamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
