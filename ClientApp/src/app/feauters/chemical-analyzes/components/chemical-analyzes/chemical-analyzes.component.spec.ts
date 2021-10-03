import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemicalAnalyzesComponent } from './chemical-analyzes.component';

describe('ChemicalAnalyzesComponent', () => {
  let component: ChemicalAnalyzesComponent;
  let fixture: ComponentFixture<ChemicalAnalyzesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChemicalAnalyzesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemicalAnalyzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
