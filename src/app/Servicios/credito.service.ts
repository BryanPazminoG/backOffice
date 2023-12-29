import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlujoDatosService } from './flujo-datos.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  private getAllApi: string = "http://localhost:8081/tipocredito/getall";
  private getByIdApi: string = "http://localhost:8081/tipocredito/getbyid";

  constructor(private http: HttpClient, private flujoDatosService: FlujoDatosService) { }

  getAllAPI(): Observable<any> {
    return this.http.get<any>(this.getAllApi);
  }
  getByIdAPI(id: number): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.http.get<any>(this.getByIdApi, { params: params });
  }
}
