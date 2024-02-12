import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private crearClientePersonaApi = "http://localhost:8081/api/v1/clientes";
  private crearClienteEmpresaApi = "http://localhost:8081/api/v1/empresas";
  private buscarClienteApi = "http://localhost:8081/api/v1/clientes/";
  private actualizarClientePersonaApi = "http://localhost:8081/api/v1/clientes";
  private tipoPersonaApi = 'http://34.102.85.160:8080/tipo-relacion/todos';
  private clienteByIdApi = 'http://localhost:8081/api/v1/clientes/';

  private relacionClientePersona = ' http://34.102.85.160:8080/cliente/guardar/relacion-cliente';


  constructor(private http: HttpClient) { }

  enviarDatosCliente(datos: any): Observable<any> {
    return this.http.post<any>(this.crearClientePersonaApi, datos);
  }

  enviarDatosEmpresa(datos: any): Observable<any> {
    return this.http.post<any>(this.crearClienteEmpresaApi, datos);
  }

  buscarClientePorParametros(tipo: string, numero: string): Observable<any> {
    return this.http.get<any>(this.buscarClienteApi + tipo + "/" + numero);
  }

  actualizarCliente(datos: any): Observable<any> {
    return this.http.put<any>(this.actualizarClientePersonaApi, datos);
  }

  obtenerTiposRelacion(): Observable<any[]> {
    return this.http.get<any[]>(this.tipoPersonaApi);
  }
  getClienteByIdAPI(id: any){
    const params = new HttpParams()
      .set('id', id);
    return this.http.get<any>(this.clienteByIdApi + id);
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
