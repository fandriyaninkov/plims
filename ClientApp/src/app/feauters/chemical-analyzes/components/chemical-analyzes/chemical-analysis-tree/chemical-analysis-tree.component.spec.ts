import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemicalAnalysisTreeComponent } from './chemical-analysis-tree.component';

describe('ChemicalAnalysisTreeComponent', () => {
  let component: ChemicalAnalysisTreeComponent;
  let fixture: ComponentFixture<ChemicalAnalysisTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChemicalAnalysisTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemicalAnalysisTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
