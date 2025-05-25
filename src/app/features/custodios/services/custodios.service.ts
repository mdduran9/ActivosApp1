import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Custodio} from '../models/custodio.model';

@Injectable({
  providedIn: 'root'
})
export class CustodiosService {
  private apiUrl = 'http://localhost:3000/custodios';

  constructor(private http: HttpClient) {}

  getCustodios(): Observable<Custodio[]> {
    return this.http.get<Custodio[]>(this.apiUrl);
  }


}
