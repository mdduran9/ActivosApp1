import {Component, OnInit} from '@angular/core';
import {ActivoService} from '../../services/activo.service';
import {Activo} from '../../models/user.model';
import {Area} from '../../../areas/models/area.model';
import {AreasService} from '../../../areas/services/areas.service';
import Swal from 'sweetalert2';
import {CustodiosService} from '../../../custodios/services/custodios.service';

@Component({
  selector: 'app-listado-page',
  standalone: false,
  templateUrl: './listado-page.component.html',
  styleUrl: './listado-page.component.css'
})

export class ListadoPageComponent implements OnInit {

  listado: Array<Activo> = []
  registroSeleccionado: Activo | null = null
  registroMovimiento: Activo | null = null

  areas: Array<Area> = []
  areaSeleccionada: string = '';

  costodios: Array<Area> = []
  costodioSeleccionado: string = '';

  paginaActual: number = 1;
  limite: number = 10;
  campoOrden: string = 'valor';
  orden: 'asc' | 'desc' = 'desc';
  search: string = '';
  totalActivos: number = 0

  constructor(private activoService: ActivoService, private areasService: AreasService,
              private custodiosService: CustodiosService) {
  }

  ngOnInit(): void {
    this.obtenerActivos()
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

  obtenerActivos(): void {


    this.activoService.getActivosPagina(
      this.paginaActual,
      this.limite,
      this.campoOrden,
      this.orden,
      this.search
    ).subscribe({
      next: (data) => {
        this.listado = data.data;
        this.totalActivos = data.total;

      },
      error: (err) => {
        console.error('Error al cargar activos', err);
      }
    });
  }

  onPaginaCambiada(nuevaPagina: number): void {
    this.paginaActual = nuevaPagina;
    this.obtenerActivos();
  }

  abrirModalBaja(activo: any) {
    this.registroSeleccionado = activo;
  }

  abrirModalMovimiento(activo: any) {
    this.registroMovimiento = activo;
  }

  darDeBaja(deBaja: Activo): void {
    deBaja.estado = "Inactivo"

    this.activoService.editarActivo(deBaja.id, deBaja).subscribe({
      next: (data) => {
        this.obtenerActivos()
        this.registroSeleccionado = null
      },
      error: (err) => {
        console.error('Error al cargar activos', err);
      }
    });
  }

  mover(mover: Activo): void {

    if (!this.areaSeleccionada) {
      Swal.fire({
        title: '¡Error!',
        text: 'Debe seleccionar una area',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });

      return;
    }

    if(!this.costodioSeleccionado){

      Swal.fire({
        title: '¡Error!',
        text: 'Debe seleccionar una custodio',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });

      return;
    }

    mover.area = this.areaSeleccionada
    mover.custodio = this.costodioSeleccionado

    this.activoService.editarActivo(mover.id, mover).subscribe({
      next: (data) => {
        this.obtenerActivos()
        this.registroMovimiento = null

        Swal.fire({
          title: '¡Éxito!',
          text: 'Se ha realizado el movimiento exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (err) => {
        console.error('Error al cargar activos', err);
      }
    });
  }


  cambiarOrden(campo: string) {
    if (this.campoOrden === campo) {
      this.orden = this.orden === 'asc' ? 'desc' : 'asc';
    } else {
      this.campoOrden = campo;
      this.orden = 'asc';
    }
    this.obtenerActivos();
  }


}

