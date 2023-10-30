import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DreamcasinoComponent } from './dreamcasino.component';

describe('DreamcasinoComponent', () => {
  let component: DreamcasinoComponent;
  let fixture: ComponentFixture<DreamcasinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DreamcasinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DreamcasinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
