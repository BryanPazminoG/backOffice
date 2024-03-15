import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlujoDatosService } from './flujo-datos.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  //Gateway
  // private getAllTipoCreApi: string =      "http://34.176.119.102:9090/api/v1/tipoCreditos";
  // private getByIdTipoCreApi: string =     "http://34.176.119.102:9090/api/v1/tipoCreditos/";
  // private getByIdTasaIntApi: string =     "http://34.176.119.102:9090/api/v1/tasainteres/";
  // private getCalculoTasaIntApi: string =  "http://34.176.119.102:9090/api/v1/tasainteres/";
  // private getPreTablaPagoApi: string =    "http://34.176.119.102:9090/api/v1/pagos/";
  // private postCreditoApi: string =        "http://34.176.119.102:9090/api/v1/creditos";
  // private postCredIntApi: string =        "http://34.176.119.102:9090/api/v1/intervinientes";
  // private postTablaPagApi: string =       "http://34.176.119.102:9090/api/v1/pagos";
  // Back
  private getAllTipoCreApi: string =      "http://34.72.172.227:8080/api/v1/tipoCreditos";
  private getByIdTipoCreApi: string =     "http://34.72.172.227:8080/api/v1/tipoCreditos/";
  private getByIdTasaIntApi: string =     "http://34.72.172.227:8080/api/v1/tasaInteres/";
  private postCreditoApi: string =        "http://34.72.172.227:8080/api/v1/creditos";
  private postCredIntApi: string =        "http://34.72.172.227:8080/api/v1/intervinientes";
  private postTablaPagApi: string =       "http://34.72.172.227:8080/api/v1/tablaAmortizacion";

  constructor(private http: HttpClient, private flujoDatosService: FlujoDatosService) { }

  getAllTipoCreAPI(): Observable<any> {
    return this.http.get<any>(this.getAllTipoCreApi);
  }
  getByIdTipoCreAPI(id: number): Observable<any> {
    return this.http.get<any>(this.getByIdTipoCreApi + id);
  }
  getByIdTasaIntAPI(id: string): Observable<any> {
    return this.http.get<any>(this.getByIdTasaIntApi + id);
  }
  postCreditoAPI(registroCredito: any): Observable<any> {
    return this.http.post<any>(this.postCreditoApi, registroCredito);
  }
  postCredIntAPI(creditoIntRegistro: any): Observable<any> {
    return this.http.post<any>(this.postCredIntApi, creditoIntRegistro);
  }
  postTablaPagAPI(tablaPagosRegistro: any): Observable<any> {
    return this.http.post<any>(this.postTablaPagApi, tablaPagosRegistro);
  }
}
