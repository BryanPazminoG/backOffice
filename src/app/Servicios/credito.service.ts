import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlujoDatosService } from './flujo-datos.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  private getAllTipoCreApi: string = "http://localhost:8083/api/v1/tipoCreditos";
  private getByIdTipoCreApi: string = "http://localhost:8083/api/v1/tipoCreditos/";
  private getByIdTasaIntApi: string = "http://localhost:8083/api/v1/tasainteres/";
  private getCalculoTasaIntApi: string = "http://localhost:8083/api/v1/tasainteres/";
  private getPreTablaPagoApi: string = "http://localhost:8083/api/v1/pagos/";
  private postCreditoApi: string = "http://localhost:8083/api/v1/creditos";
  private postCredIntApi: string = "http://localhost:8083/api/v1/intervinientes";
  private postTablaPagApi: string = "http://localhost:8083/api/v1/pagos";

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
  getCalculoTasaIntAPI(id: string, monto: number, plazo: number): Observable<any> {
    console.log(this.getCalculoTasaIntApi + id + "/" + monto + "/" + plazo);
    return this.http.get<any>(this.getCalculoTasaIntApi + id + "/" + monto + "/" + plazo);
  }
  getPreTablaPagoAPI(tasaInteres: number, montoPrestamo: number, numeroPagos: number): Observable<any> {
    return this.http.get<any>(this.getPreTablaPagoApi + tasaInteres + "/" + montoPrestamo + "/" + numeroPagos);
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
