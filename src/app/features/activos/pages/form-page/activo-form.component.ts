import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Activo} from '../../models/user.model';
import {ActivoService} from '../../services/activo.service';
import Swal from 'sweetalert2';
import {Area} from '../../../areas/models/area.model';
import {AreasService} from '../../../areas/services/areas.service';
import {CustodiosService} from '../../../custodios/services/custodios.service';


@Component({
  standalone: false,
  selector: 'app-activo-form',
  templateUrl: './activo-form.component.html',
  styleUrls: ['./activo-form.component.css']
})
export class ActivoFormComponent implements OnInit {
  activoForm: FormGroup;
  isEditMode = false;
  activoId: string | null = null;

  areas: Array<Area> = []
  costodios: Array<Area> = []


  constructor(
    private fb: FormBuilder,
    private activosService: ActivoService,
    private router: Router,
    private route: ActivatedRoute,
    private areasService: AreasService,
    private custodiosService: CustodiosService
  ) {
    this.activoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      categoria: ['', Validators.required],
      area: ['', Validators.required],
      custodio: ['', Validators.required],
      fechaAdquisicion: ['', [Validators.required, this.fechaValida()]],
      valor: ['', [Validators.required, Validators.min(0)]],
      estado: ['']
    });
  }

  ngOnInit(): void {
    this.activoId = this.route.snapshot.paramMap.get('id');
    if (this.activoId) {
      this.isEditMode = true;
      this.cargarActivo();
    }
    this.obtenerAreas()
    this.obtenerCustodios()

  }

  obtenerCustodios(): void {

    this.custodiosService.getCustodios().subscribe({
      next: (data) => {
        this.costodios = data;

      },
      error: (err) => {
        console.error('Error al cargar activos', err);
      }
    });
  }
  obtenerAreas(): void {


    this.areasService.getAreas().subscribe({
      next: (data) => {
        this.areas = data;

      },
      error: (err) => {
        console.error('Error al cargar activos', err);
      }
    });
  }


  private fechaValida() {
    return (control: any) => {
      const fecha = new Date(control.value);
      return fecha instanceof Date && !isNaN(fecha.getTime()) ? null : {fechaInvalida: true};
    };
  }

  cargarActivo(): void {
    if (this.activoId) {
      this.activosService.getActivoPorId(this.activoId).subscribe({
        next: (activo) => {
          this.activoForm.patchValue(activo);
        }
        , error: (error: any) => {
          console.error('Error al actualizar el activo:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.activoForm.valid) {
      const activo: Activo = this.activoForm.value;

      if (this.isEditMode && this.activoId) {
        this.activosService.editarActivo(this.activoId, activo).subscribe({
          next: () => {

            Swal.fire({
              title: '¡Éxito!',
              text: 'Se ha actualizado el activo',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });

            this.router.navigate(['/activos/listar']);

          }, error: (error: any) => {
            console.error('Error al actualizar el activo:', error);
          }
        });
      } else {

        activo.id = new Date().getTime().toString();

        this.activosService.crearActivo(activo).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Éxito!',
              text: 'Se ha creado el activo',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });

            this.router.navigate(['/activos/listar']);
          }
          , error: (error: any) => {
            console.error('Error al crear el activo:', error);
          }
        });
      }
    }
  }

  getErrorMessage(campo: string): string {
    const control = this.activoForm.get(campo);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('minlength')) {
      return 'El nombre debe tener al menos 3 caracteres';
    }
    if (control?.hasError('min')) {
      return 'El valor debe ser mayor o igual a 0';
    }
    if (control?.hasError('fechaInvalida')) {
      return 'La fecha no es válida';
    }
    return '';
  }
}
