import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { EjerciciosService } from '../../../../service/ejercicio/ejercicios.service';
import { EquiposService } from '../../../../service/equipo/equipo.service';
import { RutinasService } from '../../../../service/rutinas/rutinas.service';

interface Options {
  name: string,
  code: string
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  updatedEjercicioForm: FormGroup;
  visible: boolean = false;
  rutina: any = undefined;
  ejercicios: any;

  Niveles = [
    { name: 'Principiante', value: 'Principiante' },
    { name: 'Intermedio', value: 'Intermedio' },
    { name: 'Avanzado', value: 'Avanzado' }
  ]

  items: MenuItem[] | undefined;

  maquinas: Options[] = [];
  data: any;

  selectedMaquina: Options[] = [];
  selectedRutina: Options[] = [];

  showDialog(id: string) {
    this.loadRutina();
    this.ejerciciosService.obtenerEjercicio(id).subscribe({
      next: (ejercicio) => {
        this.updatedEjercicioForm.patchValue({
          id: ejercicio?.id ?? null,
          maquinas: ejercicio?.maquinas.map((maquina: { nombre: string, id: string }) => ({ name: maquina.nombre, code: maquina.id })) ?? null,
          nombre: ejercicio?.nombre ?? null,
          nivel: this.Niveles.find((nivel) => nivel.name === ejercicio?.nivel) ?? null,
          series: ejercicio?.series ?? null,
          repeticiones: ejercicio?.repeticiones ?? null,
          descanso: ejercicio?.descanso ?? null,
          descripcion: ejercicio?.descripcion ?? null
        });
        this.visible = true;
      },
      error(err) {
        console.log(err)
      },
    });

  }

  closedDialog() {
    this.visible = false;
    this.updatedEjercicioForm.reset({
      id: null,
      maquinas: null,
      nombre: null,
      nivel: null,
      series: null,
      repeticiones: null,
      descanso: null,
      descripcion: null,
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private rutinaService: RutinasService,
    private equiposService: EquiposService,
    private ejerciciosService: EjerciciosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.updatedEjercicioForm = this.fb.group({
      id: new FormControl<string | null>(null),
      maquinas: new FormControl<string | null>(null),
      nombre: new FormControl<string | null>(null),
      nivel: new FormControl<string | null>(null),
      series: new FormControl<number | null>(null),
      repeticiones: new FormControl<number | null>(null),
      descanso: new FormControl<number | null>(null),
      descripcion: new FormControl<string | null>(null),
    });
  }

  selectedProducts!: any;

  ngOnInit(): void {
    this.equiposService.obtenerDatos().subscribe({
      next(value) {
        console.log(value);
      },
    });
      console.log(this.maquinas);
    this.loadRutina();
    this.items = [
      {
        label: 'Editar',
        icon: 'edit',
        action: (id: string) => {
          this.showDialog(id);
        }
      },
      {
        label: 'Eliminar',
        icon: 'delete',
        action: (id: string) => {
          this.confirm(id);
        }
      }
    ];
  }

  loadRutina() {
    const rutinaSlug = this.route.snapshot.paramMap.get('id') ?? '';
    this.rutinaService.obtenerRutina(rutinaSlug).subscribe({
      next: (data) => {
        this.data = data;
        console.log(data);
      }
    })
  }

  getItemsAsString(items: { nombre: string; }[]) {
    return items?.map(role => role.nombre).join(', ') || 'Sin elemento asignado';
  }

  updatedEjercicio() {
    try {
      const { maquinas, rutinas, nivel, ...data } = this.updatedEjercicioForm.value;
      this.ejerciciosService.actualizarEjercicio({
        ...data,
        maquinas: maquinas ? this.selectedMaquina.map((maquina) => maquina.code) : null,
        rutinas: rutinas ? this.selectedRutina.map((rutina) => rutina.code) : null,
        nivel: nivel && nivel.value
      }).subscribe({
        next: () => {
          this.updatedEjercicioForm.reset();
          this.loadRutina();
          this.visible = false;
        },
        error: (err) => {
          console.log('Error al enviar los datos', err, err.error.errors);
          this.updatedEjercicioForm.setErrors(err.error.errors);
        },
      });
    } catch (error) {
      console.log('Error al enviar los datos', error);
    }
  }
  confirm(id: string) {
    this.confirmationService.confirm({
      header: 'Eliminar Ejercicio',
      message: 'El ejercicio se eliminará de forma permanente',
      accept: () => {
        this.ejerciciosService.eliminarEjercicio(id).subscribe({
          next: () => {
            this.loadRutina();
            this.messageService.add({ severity: 'success', summary: 'Ejercicio eliminado', detail: 'Ejercicio eliminado con éxito' });
          }
        });
      },
      reject: () => { }
    });
  }
}


