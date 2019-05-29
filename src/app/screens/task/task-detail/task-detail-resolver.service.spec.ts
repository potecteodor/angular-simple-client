import { TestBed } from '@angular/core/testing';

import { TaskDetailResolverService } from './task-detail-resolver.service';

describe('TaskDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskDetailResolverService = TestBed.get(TaskDetailResolverService);
    expect(service).toBeTruthy();
  });
});
