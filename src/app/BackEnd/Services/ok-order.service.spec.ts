import { TestBed } from '@angular/core/testing';

import { OkOrderService } from './ok-order.service';

describe('OkOrderService', () => {
  let service: OkOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OkOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
