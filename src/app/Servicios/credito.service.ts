import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlujoDatosService } from './flujo-datos.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  private getAllTipoCreApi: string = "http://localhost:8081/tipocredito/getall";
  private getByIdTipoCreApi: string = "http://localhost:8081/tipocredito/getbyid";
  private getByIdTasaIntApi: string = "http://localhost:8081/tasainteres/getbyid";
  private getCalculoTasaIntApi: string = "http://localhost:8081/tasainteres/calcular";
  private getPreTablaPagoApi: string = "http://localhost:8081/creditotablapagos/pretablapagos";

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
}
