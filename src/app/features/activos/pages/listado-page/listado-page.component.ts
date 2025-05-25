import {Component, OnInit} from '@angular/core';
import {ActivoService} from '../../services/activo.service';
import {Activo} from '../../models/user.model';

@Component({
  selector: 'app-listado-page',
  standalone: false,
  templateUrl: './listado-page.component.html',
  styleUrl: './listado-page.component.css'
})

export class ListadoPageComponent implements OnInit {

  listado: Array<Activo> = []
  registroSeleccionado: Activo | null = null

  paginaActual: number = 1;
  limite: number = 10;
  campoOrden: string = 'valor';
  orden: 'asc' | 'desc' = 'desc';
  search: string = '';
  totalActivos: number = 0

  constructor(private activoService: ActivoService) {
  }

  ngOnInit(): void {
    this.obtenerActivos()
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

  abrirModal(activo: any) {
    this.registroSeleccionado = activo;
  }

  darDeBaja(deBaja: Activo): void {
    deBaja.estado = "Inactivo"

    this.activoService.editarActivo(deBaja.id, deBaja).subscribe({
      next: (data) => {
        this.obtenerActivos()
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

