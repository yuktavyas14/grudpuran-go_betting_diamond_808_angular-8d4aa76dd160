import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoslotComponent } from './casinoslot.component';

describe('CasinoslotComponent', () => {
  let component: CasinoslotComponent;
  let fixture: ComponentFixture<CasinoslotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasinoslotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasinoslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
