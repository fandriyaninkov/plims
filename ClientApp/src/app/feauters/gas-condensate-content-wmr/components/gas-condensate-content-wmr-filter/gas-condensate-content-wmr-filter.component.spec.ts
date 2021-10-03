import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasCondensateContentWmrFilterComponent } from './gas-condensate-content-wmr-filter.component';

describe('GasCondensateContentWmrFilterComponent', () => {
  let component: GasCondensateContentWmrFilterComponent;
  let fixture: ComponentFixture<GasCondensateContentWmrFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasCondensateContentWmrFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasCondensateContentWmrFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
