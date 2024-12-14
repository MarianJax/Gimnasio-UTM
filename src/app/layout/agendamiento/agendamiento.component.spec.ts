import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamientoComponent } from './agendamiento.component';

describe('AgendamientoComponent', () => {
  let component: AgendamientoComponent;
  let fixture: ComponentFixture<AgendamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendamientoComponent]
    });
    fixture = TestBed.createComponent(AgendamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
