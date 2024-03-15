import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  //Local
  // private crearClientePersonaApi =       "http://localhost:8080/api/v1/clientes/naturales";
  // private crearClienteEmpresaApi =       "http://localhost:8080/api/v1/clientes/empresas";
  // private buscarClienteApi =             "http://localhost:8080/api/v1/clientes/naturales/";
  // private actualizarClientePersonaApi =  "http://localhost:8080/api/v1/clientes/naturales";
  // private clienteByIdApi =               'http://localhost:8080/api/v1/clientes/naturales/';

  //Back
  private crearClientePersonaApi =       "http://34.123.168.16:8080/api/v1/clientes/naturales";
  private crearClienteEmpresaApi =       "http://34.123.168.16:8080/api/v1/clientes/empresas";
  private buscarClienteApi =             "http://34.123.168.16:8080/api/v1/clientes/naturales/";
  private actualizarClientePersonaApi =  "http://34.123.168.16:8080/api/v1/clientes/naturales";
  private clienteByIdApi =               'http://34.123.168.16:8080/api/v1/clientes/naturales/';

  


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

  getClienteByIdAPI(id: any){
    const params = new HttpParams()
      .set('id', id);
    return this.http.get<any>(this.clienteByIdApi + id);
  }

  

}
