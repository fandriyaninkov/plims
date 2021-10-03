import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasCondensateContentWmrComponent } from './gas-condensate-content-wmr.component';

describe('GasCondensateContentWmrComponent', () => {
  let component: GasCondensateContentWmrComponent;
  let fixture: ComponentFixture<GasCondensateContentWmrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasCondensateContentWmrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasCondensateContentWmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
