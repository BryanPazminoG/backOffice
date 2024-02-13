import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlujoDatosService } from './flujo-datos.service';

@Injectable({
  providedIn: 'root'
})
export class SegUsuarioService {

  
  // Localhost
  private accesoUsuario: string =   "http://34.173.172.59:8093/api/v1/empleados/sesiones";
  private crearPersonal: string =   "http://34.173.172.59:8093/api/v1/empleados";
  private buscarRoles: string =     "http://34.173.172.59:8093/api/v1/roles";
  private accesoP: string =         "http://34.173.172.59:8093/api/v1/accesos";

  // Gateway
  // private accesoUsuario: string =   "http://34.176.119.102:9090/api/v1/empleados/sesiones";
  // private crearPersonal: string =   "http://34.176.119.102:9090/api/v1/empleados";
  // private buscarRoles: string =     "http://34.176.119.102:9090/api/v1/roles";
  // private accesoP: string =         "http://34.176.119.102:9090/api/v1/accesos";

  constructor(private http: HttpClient, private flujoDatosService: FlujoDatosService) { }

  buscarRol(): Observable<any> {
    return this.http.get<any>(this.buscarRoles);
  }

  crearPersonalBancario(Datos: any): Observable<any> {
    return this.http.post<any>(this.crearPersonal, Datos);
  }

  crearAccesoPB(accPB: any): Observable<any> {
    return this.http.post<any>(this.accesoP, accPB);
  }

  validarUsuarioLogin(credencialesUser: any): Observable<any>{
    return this.http.post<any>(this.accesoUsuario, credencialesUser);
  }
}
