import { TestBed } from '@angular/core/testing';

import { AccActivationService } from './acc-activation.service';

describe('AccActivationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccActivationService = TestBed.get(AccActivationService);
    expect(service).toBeTruthy();
  });
});
