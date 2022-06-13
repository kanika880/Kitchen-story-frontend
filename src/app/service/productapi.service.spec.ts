import { TestBed } from '@angular/core/testing';

import { ProductapiService } from './productapi.service';

describe('ProductapiService', () => {
  let service: ProductapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
