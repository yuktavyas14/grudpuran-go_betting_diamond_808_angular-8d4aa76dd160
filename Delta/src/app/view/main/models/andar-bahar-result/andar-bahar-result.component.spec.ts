import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndarBaharResultComponent } from './andar-bahar-result.component';

describe('AndarBaharResultComponent', () => {
  let component: AndarBaharResultComponent;
  let fixture: ComponentFixture<AndarBaharResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AndarBaharResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AndarBaharResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
