import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  //Gateway
  private crearClientePersonaApi =       "http://34.176.119.102:9090/api/v1/clientes";
  private crearClienteEmpresaApi =       "http://34.176.119.102:9090/api/v1/empresas";
  private buscarClienteApi =             "http://34.176.119.102:9090/api/v1/clientes/";
  private actualizarClientePersonaApi =  "http://34.176.119.102:9090/api/v1/clientes";
  private clienteByIdApi =               'http://34.176.119.102:9090/api/v1/clientes/';

  //Back
  // private crearClientePersonaApi =      "http://35.192.130.249:8081/api/v1/clientes";
  // private crearClienteEmpresaApi =      "http://35.192.130.249:8081/api/v1/empresas";
  // private buscarClienteApi =            "http://35.192.130.249:8081/api/v1/clientes/";
  // private actualizarClientePersonaApi = "http://35.192.130.249:8081/api/v1/clientes";
  // private clienteByIdApi =              'http://35.192.130.249:8081/api/v1/clientes/';

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
