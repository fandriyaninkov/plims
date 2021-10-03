import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplingPlaceDetailsComponent } from './sampling-place-details.component';

describe('SamplingPlaceDetailsComponent', () => {
  let component: SamplingPlaceDetailsComponent;
  let fixture: ComponentFixture<SamplingPlaceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplingPlaceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplingPlaceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
