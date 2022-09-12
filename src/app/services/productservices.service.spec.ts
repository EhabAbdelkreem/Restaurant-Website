import { TestBed } from '@angular/core/testing';

import { ProductservicesService } from './productservices.service';

describe('ProductservicesService', () => {
  let service: ProductservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
