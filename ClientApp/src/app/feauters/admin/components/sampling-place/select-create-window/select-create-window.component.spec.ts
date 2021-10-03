import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCreateWindowComponent } from './select-create-window.component';

describe('SelectCreateWindowComponent', () => {
  let component: SelectCreateWindowComponent;
  let fixture: ComponentFixture<SelectCreateWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCreateWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCreateWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
