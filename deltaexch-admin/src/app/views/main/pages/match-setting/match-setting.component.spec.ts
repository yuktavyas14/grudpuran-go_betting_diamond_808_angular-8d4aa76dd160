import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchSettingComponent } from './match-setting.component';

describe('MatchSettingComponent', () => {
  let component: MatchSettingComponent;
  let fixture: ComponentFixture<MatchSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
