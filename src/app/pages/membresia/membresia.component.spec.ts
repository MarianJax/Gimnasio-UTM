import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresiaComponent } from './membresia.component';

describe('MembresiaComponent', () => {
  let component: MembresiaComponent;
  let fixture: ComponentFixture<MembresiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembresiaComponent]
    });
    fixture = TestBed.createComponent(MembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
