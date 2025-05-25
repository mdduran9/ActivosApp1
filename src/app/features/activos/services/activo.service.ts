import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Activo} from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {
  private apiUrl = 'http://localhost:3000/activos';

  constructor(private http: HttpClient) {}

  getActivos(): Observable<Activo[]> {
    return this.http.get<Activo[]>(this.apiUrl);
  }

  crearActivo(data: Activo): Observable<Activo> {
    return this.http.post<Activo>(this.apiUrl, data);
  }

  editarActivo(id: number, data: Activo): Observable<Activo> {
    return this.http.put<Activo>(`${this.apiUrl}/${id}`, data);
  }

  eliminarActivo(id: number): Observable<Activo> {
    return this.http.delete<Activo>(`${this.apiUrl}/${id}`);
  }

  getActivosPagina(
    page: number = 1,
    limit: number = 10,
    sort: string = 'id',
    order: 'asc' | 'desc' = 'asc',
    search: string = ''
  ): Observable<{ data: Activo[], total: number }> {
    let params = new HttpParams().set('_sort', sort).set('_order', order);

    return this.http.get<Activo[]>(this.apiUrl, { params }).pipe(
      map(activos => {
        if (search) {
          page = 1;

          const lowerSearch = search.toLowerCase();
          activos = activos.filter(activo =>
            Object.values(activo).some(value =>
              String(value).toLowerCase().includes(lowerSearch)
            )
          );
        }

        const total = activos.length;
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginados = activos.slice(start, end);

        return { data: paginados, total };
      })
    );
  }
}
