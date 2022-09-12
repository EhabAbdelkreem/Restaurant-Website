import { TestBed } from '@angular/core/testing';

import { ConsumService } from './consum.service';

describe('ConsumService', () => {
  let service: ConsumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
