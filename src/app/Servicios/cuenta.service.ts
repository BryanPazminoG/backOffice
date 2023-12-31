import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private getCuentaByClienteApi: string = "http://localhost:8082/cuenta/obtenerCuentasCliente/";
  private postCuentaSaveApi: string = "http://localhost:8082/cuenta/save";

  constructor(private http: HttpClient) { }

  getCuentaByClienteAPI(id: number): Observable<any> {
    return this.http.get<any>(this.getCuentaByClienteApi + id);
  }
  postCuentaAPI(registroCuenta: any): Observable<any> {
    return this.http.post<any>(this.postCuentaSaveApi, registroCuenta);
  }
}
