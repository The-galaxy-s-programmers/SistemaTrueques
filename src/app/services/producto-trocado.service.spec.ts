import { TestBed } from '@angular/core/testing';

import { ProductoTrocadoService } from './producto-trocado.service';

describe('ProductoTrocadoService', () => {
  let service: ProductoTrocadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoTrocadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
