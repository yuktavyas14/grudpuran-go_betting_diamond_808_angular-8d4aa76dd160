import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupMenuListComponent } from './cup-menu-list.component';

describe('CupMenuListComponent', () => {
  let component: CupMenuListComponent;
  let fixture: ComponentFixture<CupMenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CupMenuListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CupMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
