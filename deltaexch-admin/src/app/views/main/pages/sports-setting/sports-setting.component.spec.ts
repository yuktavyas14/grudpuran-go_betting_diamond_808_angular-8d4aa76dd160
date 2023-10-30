import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsSettingComponent } from './sports-setting.component';

describe('SportsSettingComponent', () => {
  let component: SportsSettingComponent;
  let fixture: ComponentFixture<SportsSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportsSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
