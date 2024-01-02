import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlujoDatosService } from './flujo-datos.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  private getAllTipoCreApi: string = "http://34.125.114.60:8080/tipocredito/getall";
  private getByIdTipoCreApi: string = "http://34.125.114.60:8080/tipocredito/getbyid";
  private getByIdTasaIntApi: string = "http://34.125.114.60:8080/tasainteres/getbyid";
  private getCalculoTasaIntApi: string = "http://34.125.114.60:8080/tasainteres/calcular";
  private getPreTablaPagoApi: string = "http://34.125.114.60:8080/creditotablapagos/pretablapagos";
  private postCreditoApi: string = "http://34.125.114.60:8080/credito/save";
  private postCredIntApi: string = "http://34.125.114.60:8080/creditointerviniente/save";
  private postTablaPagApi: string = "http://34.125.114.60:8080/creditotablapagos/save";

  constructor(private http: HttpClient, private flujoDatosService: FlujoDatosService) { }

  getAllTipoCreAPI(): Observable<any> {
    return this.http.get<any>(this.getAllTipoCreApi);
  }
  getByIdTipoCreAPI(id: number): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.http.get<any>(this.getByIdTipoCreApi, { params: params });
  }
  getByIdTasaIntAPI(id: string): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.http.get<any>(this.getByIdTasaIntApi, { params: params });
  }
  getCalculoTasaIntAPI(id: string, monto: number, plazo: number): Observable<any> {
    let params = new HttpParams().set('id', id).set('monto', monto).set('plazo', plazo);
    return this.http.get<any>(this.getCalculoTasaIntApi, { params: params });
  }
  getPreTablaPagoAPI(tasaInteres: number, montoPrestamo: number, numeroPagos: number): Observable<any> {
    let params = new HttpParams().set('tasaInteres', tasaInteres).set('montoPrestamo', montoPrestamo).set('numeroPagos', numeroPagos);
    return this.http.get<any>(this.getPreTablaPagoApi, { params: params });
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
