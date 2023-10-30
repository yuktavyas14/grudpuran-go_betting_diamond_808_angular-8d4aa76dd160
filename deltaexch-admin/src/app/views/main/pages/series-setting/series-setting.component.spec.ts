import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesSettingComponent } from './series-setting.component';

describe('SeriesSettingComponent', () => {
  let component: SeriesSettingComponent;
  let fixture: ComponentFixture<SeriesSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
