import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Activo} from '../../activos/models/user.model';
import {map} from 'rxjs/operators';
import {Movimiento} from '../models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private apiUrl = 'http://localhost:3000/movimientos';


  constructor(private http: HttpClient) {
  }

  getMovimientos(
    page: number = 1,
    limit: number = 10,
  ): Observable<{ data: Movimiento[], total: number }> {


    return this.http.get<Movimiento[]>(this.apiUrl).pipe(
      map(activos => {

        const total = activos.length;
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginados = activos.slice(start, end);

        return {data: paginados, total};
      })
    );
  }

  crearActivo(data: Movimiento): Observable<Movimiento> {
    return this.http.post<Movimiento>(this.apiUrl, data);
  }

}


