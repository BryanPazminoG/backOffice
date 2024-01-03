import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private crearClientePersonaApi = "https://checkcode.site/cliente/guardar/persona";
  private crearClienteEmpresaApi = "https://checkcode.site/cliente/guardar/empresa";
  private buscarClienteApi = "https://checkcode.site/cliente/buscar";
  private actualizarClientePersonaApi = "https://checkcode.site/cliente/actualizar/persona";
  private tipoPersonaApi = 'https://checkcode.site/tipo-relacion/todos';
  private clienteByIdApi = 'https://checkcode.site/cliente/buscar-cliente';

  private relacionClientePersona = ' http://checkcode.site/cliente/guardar/relacion-cliente';


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
  getClienteByIdAPI(id: number){
    const params = new HttpParams()
      .set('id', id);
    return this.http.get<any>(this.clienteByIdApi, {params: params});
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
