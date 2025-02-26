import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHorariosComponent } from './table-horarios.component';

describe('TableHorariosComponent', () => {
  let component: TableHorariosComponent;
  let fixture: ComponentFixture<TableHorariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableHorariosComponent]
    });
    fixture = TestBed.createComponent(TableHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
