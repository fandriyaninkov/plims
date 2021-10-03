import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasCondensateContentWmrTableComponent } from './gas-condensate-content-wmr-table.component';

describe('GasCondensateContentWmrTableComponent', () => {
  let component: GasCondensateContentWmrTableComponent;
  let fixture: ComponentFixture<GasCondensateContentWmrTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasCondensateContentWmrTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasCondensateContentWmrTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
