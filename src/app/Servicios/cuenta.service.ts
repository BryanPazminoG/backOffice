import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private getCuentaByClienteApi: string = "http://34.125.120.215:8080/cuenta/obtenerCuentasCliente/";
  private getCuentaByIdApi: string = "http://34.125.120.215:8080/cuenta/getbyid/";
  private getCuentaByNumeroApi: string = "  http://34.125.120.215:8080/cuenta/buscar/";
  private postCuentaSaveApi: string = "http://34.125.120.215:8080/cuenta/save";
  private getTipoCuentaAllApi: string = "http://34.125.120.215:8080/tipocuenta/getall"
  private getTipoCuentaByIdApi: string = "http://34.125.120.215:8080/tipocuenta/getbyid/"
  private getInterByCuentadApi: string = "http://34.125.120.215:8080/cuentaintervinientes/getbycuenta/"
  private getInterByClienteApi: string = "http://34.125.120.215:8080/cuentaintervinientes/getbycliente/"
  private postCuentaApi: string = "http://34.125.120.215:8080/cuenta/save"
  private postCuentaParticipantesApi: string = "http://34.125.120.215:8080/cuentaintervinientes/save"
  private postTransaccionApi: string = "http://34.125.120.215:8080/transaccion/transferencia"

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
    return this.http.get<any>(this.getTipoCuentaAllApi);
  }
  getTipoCuentaByIdAPI(id: string): Observable<any> {
    return this.http.get<any>(this.getTipoCuentaByIdApi + id);
  }
  getInterByCuentadAPI(id: number): Observable<any> {
    return this.http.get<any>(this.getInterByCuentadApi + id);
  }
  getInterByClienteAPI(id: number): Observable<any> {
    return this.http.get<any>(this.getInterByClienteApi + id);
  }
  postTransaccionAPI(registroTransaccion: any): Observable<any> {
    return this.http.post<any>(this.postTransaccionApi, registroTransaccion);
  }
}
