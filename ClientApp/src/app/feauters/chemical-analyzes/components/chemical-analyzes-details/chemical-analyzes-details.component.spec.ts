import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemicalAnalyzesDetailsComponent } from './chemical-analyzes-details.component';

describe('ChemicalAnalyzesDetailsComponent', () => {
  let component: ChemicalAnalyzesDetailsComponent;
  let fixture: ComponentFixture<ChemicalAnalyzesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChemicalAnalyzesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemicalAnalyzesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
