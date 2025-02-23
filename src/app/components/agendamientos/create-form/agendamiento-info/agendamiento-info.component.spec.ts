import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamientoInfoComponent } from './agendamiento-info.component';

describe('AgendamientoInfoComponent', () => {
  let component: AgendamientoInfoComponent;
  let fixture: ComponentFixture<AgendamientoInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendamientoInfoComponent]
    });
    fixture = TestBed.createComponent(AgendamientoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
