import { TestBed } from '@angular/core/testing';

import { EquiposerviceService } from './equiposervice.service';

describe('EquiposerviceService', () => {
  let service: EquiposerviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquiposerviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
