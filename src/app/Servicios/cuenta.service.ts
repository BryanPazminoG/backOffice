import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  //Gateway
  // private getCuentaByClienteApi: string =        "http://34.176.119.102:9090/api/v1/cuentas/clientes/";
  // private getCuentaByNumeroApi: string =         "http://34.176.119.102:9090/api/v1/cuentas/numero/";
  // private postCuentaApi: string =                "http://34.176.119.102:9090/api/v1/cuentas"
  // private getTipoCuentaAllApi: string =          "http://34.176.119.102:9090/api/v1/tiposcuentas"
  // private getTipoCuentaByIdApi: string =         "http://34.176.119.102:9090/api/v1/tiposcuentas/"
  // private postCuentaParticipantesApi: string =    "http://34.176.119.102:9090/api/v1/cuentaintervinientes"
  // private getInterByClienteApi: string =        "http://34.176.119.102:9090/api/v1/cuentaintervinientes/clientes/"
  // private getCuentaByIdApi: string =            "http://34.176.119.102:9090/api/v1/cuentas/";
  // private getInterByCuentadApi: string =        "http://34.176.119.102:9090/api/v1/cuentaintervinientes/cuentas/"
  // private postTransaccionApi: string =          "http://34.176.119.102:9090/api/v1/transacciones/transferencias"
  //Back
  private getCuentaByClienteApi: string =       "http://35.232.62.178:8080/cuenta/obtenerCuentasCliente/";
  private getCuentaByNumeroApi: string =        "http://35.232.62.178:8080/api/v1/cuentas/?numeroCuenta=";
  private postCuentaApi: string =               "http://35.232.62.178:8080/api/v1/cuentas"
  private getTipoCuentaAllApi: string =         "http://35.232.62.178:8080/api/v1/tiposCuentas"
  private getTipoCuentaByIdApi: string =        "http://35.232.62.178:8080/api/v1/tiposCuentas/"
  private postCuentaParticipantesApi: string =  "http://35.232.62.178:8080/api/v1/cuentaintervinientes"
  private getInterByClienteApi: string =        "http://35.232.62.178:8080/api/v1/cuentaintervinientes/clientes/"
  private getCuentaByIdApi: string =            "http://35.232.62.178:8080/api/v1/cuentas/";
  private getInterByCuentadApi: string =        "http://35.232.62.178:8080/api/v1/cuentaintervinientes/cuentas/"
  private postTransaccionApi: string =          "http://35.232.62.178:8080/api/v1/transacciones/depositos"

  constructor(private http: HttpClient) { }

  getCuentaByClienteAPI(id: number): Observable<any> {
    return this.http.get<any>(this.getCuentaByClienteApi + id);
  }
  postCuentaAPI(registroCuenta: any): Observable<any> {
    return this.http.post<any>(this.postCuentaApi, registroCuenta);
  }
  postCuentaParticipantesAPI(registroCuentaParticipantes: any): Observable<any> {
    return this.http.post<any>(this.postCuentaParticipantesApi, registroCuentaParticipantes);
  }
  getCuentaByIdAPI(id: number): Observable<any> {
    return this.http.get<any>(this.getCuentaByIdApi + id);
  }
  getCuentaByNumeroAPI(numeroCuenta: string): Observable<any> {
    return this.http.get<any>(this.getCuentaByNumeroApi + numeroCuenta);
  }
  getTipoCuentaAllAPI(): Observable<any> {
    return this.http.get<any>(this.getTipoCuentaAllApi); //as
  }
  getTipoCuentaByIdAPI(id: string): Observable<any> {
    return this.http.get<any>(this.getTipoCuentaByIdApi + id);
  }
  getInterByCuentadAPI(id: number): Observable<any> {
    return this.http.get<any>(this.getInterByCuentadApi + id);
  }
  getInterByClienteAPI(id: any): Observable<any> {
    return this.http.get<any>(this.getInterByClienteApi + id);
  }
  postTransaccionAPI(registroTransaccion: any): Observable<any> {
    return this.http.put<any>(this.postTransaccionApi, registroTransaccion);
  }
}
