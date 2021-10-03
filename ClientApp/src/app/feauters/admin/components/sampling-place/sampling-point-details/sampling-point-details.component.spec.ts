import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplingPointDetailsComponent } from './sampling-point-details.component';

describe('SamplingPointDetailsComponent', () => {
  let component: SamplingPointDetailsComponent;
  let fixture: ComponentFixture<SamplingPointDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplingPointDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplingPointDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
