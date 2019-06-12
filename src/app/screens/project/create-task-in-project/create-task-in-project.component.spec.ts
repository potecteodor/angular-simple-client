import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskInProjectComponent } from './create-task-in-project.component';

describe('CreateTaskInProjectComponent', () => {
  let component: CreateTaskInProjectComponent;
  let fixture: ComponentFixture<CreateTaskInProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTaskInProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskInProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
