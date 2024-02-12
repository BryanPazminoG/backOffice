import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlujoDatosService } from './flujo-datos.service';

@Injectable({
  providedIn: 'root'
})
export class SegUsuarioService {

  private loginUsuarioApi: string = "http://34.16.181.123:8080/user/";
  private buscarRoles: string = "http://34.16.181.123:8080/rol/buscar-todos/";
  private personal: string = "http://34.16.181.123:8080/personal-bancario/create";
  private accesoP: string = "http://34.16.181.123:8080/accesoPbRol/createAcceso";
  //private accesoUsuario: string = "http://34.16.181.123:8080/personal-bancario/buscar-credenciales";
  private accesoUsuario: string = "http://localhost:8085/api/v1/empleados/sesiones";
  constructor(private http: HttpClient, private flujoDatosService: FlujoDatosService) { }

  loguearUsuarioAPI(usuario: string, clave: string): Observable<any> {
    let params = new HttpParams().set('usuario', usuario).set('clave', clave);
    return this.http.get<any>(this.loginUsuarioApi, { params: params });
  }

  buscarRol(): Observable<any> {
    return this.http.get<any>(this.buscarRoles);
  }

  crearPersonalBancario(Datos: any): Observable<any> {
    return this.http.post<any>(this.personal, Datos);
  }

  crearAccesoPB(accPB: any): Observable<any> {
    return this.http.post<any>(this.accesoP, accPB);
  }

  validarUsuarioLogin(credencialesUser: any): Observable<any>{
    return this.http.post<any>(this.accesoUsuario, credencialesUser);
  }
}
