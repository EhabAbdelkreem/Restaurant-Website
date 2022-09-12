import { TestBed } from '@angular/core/testing';

import { ItemservicesService } from './itemservices.service';

describe('ItemservicesService', () => {
  let service: ItemservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
