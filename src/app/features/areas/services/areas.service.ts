import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Area} from '../models/area.model';

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  private apiUrl = 'http://localhost:3000/areas';

  constructor(private http: HttpClient) {}

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl);
  }


}
