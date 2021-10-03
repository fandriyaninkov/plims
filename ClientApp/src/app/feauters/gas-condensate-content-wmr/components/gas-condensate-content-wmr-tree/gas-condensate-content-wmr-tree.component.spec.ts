import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasCondensateContentWmrTreeComponent } from './gas-condensate-content-wmr-tree.component';

describe('GasCondensateContentWmrTreeComponent', () => {
  let component: GasCondensateContentWmrTreeComponent;
  let fixture: ComponentFixture<GasCondensateContentWmrTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasCondensateContentWmrTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasCondensateContentWmrTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
