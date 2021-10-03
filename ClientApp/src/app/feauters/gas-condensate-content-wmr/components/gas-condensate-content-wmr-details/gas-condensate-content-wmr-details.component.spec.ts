import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasCondensateContentWmrDetailsComponent } from './gas-condensate-content-wmr-details.component';

describe('GasCondensateContentWmrDetailsComponent', () => {
  let component: GasCondensateContentWmrDetailsComponent;
  let fixture: ComponentFixture<GasCondensateContentWmrDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasCondensateContentWmrDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasCondensateContentWmrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
