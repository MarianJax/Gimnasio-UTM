import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionPagpComponent } from './validacion-pago.component';

describe('ValidacionPagpComponent', () => {
  let component: ValidacionPagpComponent;
  let fixture: ComponentFixture<ValidacionPagpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidacionPagpComponent],
    });
    fixture = TestBed.createComponent(ValidacionPagpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
