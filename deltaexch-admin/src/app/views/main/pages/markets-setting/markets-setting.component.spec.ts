import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketsSettingComponent } from './markets-setting.component';

describe('MarketsSettingComponent', () => {
  let component: MarketsSettingComponent;
  let fixture: ComponentFixture<MarketsSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketsSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketsSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
