import { TestBed } from '@angular/core/testing';

import { InventarioServicioService } from './inventario.servicio.service';

describe('InventarioServicioService', () => {
  let service: InventarioServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventarioServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
