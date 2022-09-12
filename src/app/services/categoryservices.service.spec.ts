import { TestBed } from '@angular/core/testing';

import { CategoryservicesService } from './categoryservices.service';

describe('CategoryservicesService', () => {
  let service: CategoryservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
