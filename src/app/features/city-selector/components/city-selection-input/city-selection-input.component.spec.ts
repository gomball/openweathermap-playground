import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySelectionInputComponent } from './city-selection-input.component';

describe('CitySelectorComponent', () => {
  let component: CitySelectionInputComponent;
  let fixture: ComponentFixture<CitySelectionInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitySelectionInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitySelectionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
