import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlujoDatosService } from './flujo-datos.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  private getAllTipoCreApi: string = "https://checkcode.site/tipocredito/getall";
  private getByIdTipoCreApi: string = "https://checkcode.site/tipocredito/getbyid";
  private getByIdTasaIntApi: string = "https://checkcode.site/tasainteres/getbyid";
  private getCalculoTasaIntApi: string = "https://checkcode.site/tasainteres/calcular";
  private getPreTablaPagoApi: string = "https://checkcode.site/creditotablapagos/pretablapagos";
  private postCreditoApi: string = "https://checkcode.site/credito/save";
  private postCredIntApi: string = "https://checkcode.site/creditointerviniente/save";
  private postTablaPagApi: string = "https://checkcode.site/creditotablapagos/save";

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
