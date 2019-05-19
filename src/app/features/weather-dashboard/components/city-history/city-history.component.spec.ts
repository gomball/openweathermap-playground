import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityHistoryComponent } from './city-history.component';

describe('CityHistoryComponent', () => {
  let component: CityHistoryComponent;
  let fixture: ComponentFixture<CityHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
