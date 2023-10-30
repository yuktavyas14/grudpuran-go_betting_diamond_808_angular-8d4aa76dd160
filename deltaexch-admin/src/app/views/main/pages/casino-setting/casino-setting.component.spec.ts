import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoSettingComponent } from './casino-setting.component';

describe('CasinoSettingComponent', () => {
  let component: CasinoSettingComponent;
  let fixture: ComponentFixture<CasinoSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasinoSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasinoSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
