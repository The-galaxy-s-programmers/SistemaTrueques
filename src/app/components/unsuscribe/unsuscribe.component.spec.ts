import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuscribeComponent } from './unsuscribe.component';

describe('UnsuscribeComponent', () => {
  let component: UnsuscribeComponent;
  let fixture: ComponentFixture<UnsuscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsuscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsuscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
