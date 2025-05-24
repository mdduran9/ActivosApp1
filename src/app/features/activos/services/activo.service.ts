import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {
  private apiUrl = 'http://localhost:3000/activos';

  constructor(private http: HttpClient) {}

  getActivos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearActivo(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  editarActivo(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  eliminarActivo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}