import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccActivationComponent } from './acc-activation.component';

describe('AccActivationComponent', () => {
  let component: AccActivationComponent;
  let fixture: ComponentFixture<AccActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccActivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
