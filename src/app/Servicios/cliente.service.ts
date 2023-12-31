import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private crearClientePersonaApi = "http://localhost:8080/cliente/guardar/persona";
  private crearClienteEmpresaApi = "http://localhost:8080/cliente/guardar/empresa";
  private buscarClienteApi = "http://localhost:8080/cliente/buscar";
  private actualizarClientePersonaApi = "http://localhost:8080/cliente/actualizar/persona";
  private tipoPersonaApi = 'http://localhost:8080/tipo-relacion/todos';

  private relacionClientePersona = 'http://localhost:8080/cliente/guardar/relacion-cliente';


  constructor(private http: HttpClient) { }

  enviarDatosCliente(datos: any): Observable<any> {
    return this.http.post<any>(this.crearClientePersonaApi, datos);
  }

  enviarDatosEmpresa(datos: any): Observable<any> {
    return this.http.post<any>(this.crearClienteEmpresaApi, datos);
  }

  buscarClientePorParametros(tipo: string, numero: string): Observable<any> {
    let params = new HttpParams().set('tipo', tipo).set('numero', numero);
    return this.http.get<any>(this.buscarClienteApi, { params: params });
  }

  actualizarCliente(datos: any): Observable<any> {
    return this.http.put<any>(this.actualizarClientePersonaApi, datos);
  }

  obtenerTiposRelacion(): Observable<any[]> {
    return this.http.get<any[]>(this.tipoPersonaApi);
  }

  crearRelacionClientePersona(codigoEmpresa: number, tipoIdentificacionPersona: string, numeroIdentificacionPersona: string, codigoRelacion: string): Observable<any> {
    const params = new HttpParams()
      .set('codigoEmpresa', codigoEmpresa)
      .set('tipoIdentificacionPersona', tipoIdentificacionPersona)
      .set('numeroIdentificacionPersona', numeroIdentificacionPersona)
      .set('codigoRelacion', codigoRelacion);

    return this.http.get<any>(this.relacionClientePersona, {params: params});
  }

  

}
