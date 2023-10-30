import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrinoCasinoComponent } from './brino-casino.component';

describe('BrinoCasinoComponent', () => {
  let component: BrinoCasinoComponent;
  let fixture: ComponentFixture<BrinoCasinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrinoCasinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrinoCasinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
