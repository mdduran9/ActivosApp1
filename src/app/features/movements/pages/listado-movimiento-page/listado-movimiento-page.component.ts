import {Component, OnInit} from '@angular/core';
import {ActivoService} from '../../../activos/services/activo.service';
import {AreasService} from '../../../areas/services/areas.service';
import {CustodiosService} from '../../../custodios/services/custodios.service';
import {MovimientosService} from '../../services/movimientos.service';
import {Activo} from '../../../activos/models/user.model';
import {Movimiento} from '../../models/movimiento.model';

@Component({
  selector: 'app-listado-movimiento-page',
  standalone: false,
  templateUrl: './listado-movimiento-page.component.html',
  styleUrl: './listado-movimiento-page.component.css'
})
export class ListadoMovimientoPageComponent implements OnInit {

  listado: Array<Movimiento> = []

  paginaActual: number = 1;
  limite: number = 10;
  totalActivos: number = 0

  constructor(private movimientoService: MovimientosService) {
  }


  ngOnInit(): void {
    this.obtenerMovimientos()
  }

  onPaginaCambiada(nuevaPagina: number): void {
    this.paginaActual = nuevaPagina;
    this.obtenerMovimientos();
  }

  obtenerMovimientos(): void {


    this.movimientoService.getMovimientos(
      this.paginaActual,
      this.limite
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
}
