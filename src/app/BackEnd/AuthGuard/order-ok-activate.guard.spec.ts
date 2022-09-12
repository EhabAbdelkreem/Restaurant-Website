import { TestBed } from '@angular/core/testing';

import { OrderOkActivateGuard } from './order-ok-activate.guard';

describe('OrderOkActivateGuard', () => {
  let guard: OrderOkActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrderOkActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
