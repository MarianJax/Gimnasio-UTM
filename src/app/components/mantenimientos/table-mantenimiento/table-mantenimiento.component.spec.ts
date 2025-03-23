import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMantenimientoComponent } from './table-mantenimiento.component';

describe('TableMantenimientoComponent', () => {
  let component: TableMantenimientoComponent;
  let fixture: ComponentFixture<TableMantenimientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableMantenimientoComponent]
    });
    fixture = TestBed.createComponent(TableMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
