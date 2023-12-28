import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlujoDatosService {
  private usuarioLogin: Object = {
    nombre: "",
    usuario: ""
  }

  constructor() { }

  public setUsuarioLogin(usuario: object){
    this.usuarioLogin = usuario;
  }
  public getUsuarioLogin(): object{
    return this.usuarioLogin;
  }
}
