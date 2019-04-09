import { TestBed } from '@angular/core/testing';

import { CollaboratorsService } from './collaborators.service';

describe('CollaboratorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollaboratorsService = TestBed.get(CollaboratorsService);
    expect(service).toBeTruthy();
  });
});
