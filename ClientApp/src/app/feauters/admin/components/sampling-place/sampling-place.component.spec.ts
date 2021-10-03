import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplingPlaceComponent } from './sampling-place.component';

describe('SamplingPlaceComponent', () => {
  let component: SamplingPlaceComponent;
  let fixture: ComponentFixture<SamplingPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplingPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplingPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
