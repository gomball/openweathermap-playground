import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwmAppidPrompterComponent } from './owm-appid-prompter.component';

describe('OwmAppidPrompterComponent', () => {
  let component: OwmAppidPrompterComponent;
  let fixture: ComponentFixture<OwmAppidPrompterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwmAppidPrompterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwmAppidPrompterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
