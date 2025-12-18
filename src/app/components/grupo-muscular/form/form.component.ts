import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GrupoMuscularService } from 'src/app/service/grupoMuscular/grupo-muscular.service';

@Component({
  selector: 'app-form-grupo-muscular',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Output() addedGrupoForm = new EventEmitter<void>();
  grupoForm: FormGroup;

  constructor(
    private grupoMuscularService: GrupoMuscularService,
    private fb: FormBuilder
  ) {
    this.grupoForm = this.fb.group({
      nombre: new FormControl<string | null>(null),
    });
  }

  addGrupo() {
    try {
      const newGrupo = this.grupoForm.value;
      this.grupoMuscularService
        .agregarGrupoMuscular({
          nombre: newGrupo.nombre,
        })
        .subscribe({
          next: (response) => {
            this.addedGrupoForm.emit();
            this.grupoForm.reset({ nombre: null });
          },
          error: (error) => {
            console.log('Error al enviar los datos', error.error.errors);
            this.grupoForm.setErrors(error.error.errors);
          },
        });
    } catch (error) {
      console.log('Error al enviar los datos', error);
    }
  }

  ngOnInit(): void {}
}
