import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ClienteService {

  private crearClienteApi = "http://localhost:8080/cliente/guardar";
  private buscarClienteApi = "http://localhost:8080/cliente/buscar";

  constructor(private http: HttpClient) { }

  enviarDatosCliente(datos: any): Observable<any> {
    return this.http.post<any>(this.crearClienteApi, datos);
  }

  buscarClientePorParametros(tipo: string, numero: string): Observable<any> {
    let params = new HttpParams().set('tipo', tipo).set('numero', numero);
    return this.http.get<any>(this.buscarClienteApi, { params: params });
  }
}
