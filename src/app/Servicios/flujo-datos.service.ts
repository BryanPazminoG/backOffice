import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlujoDatosService {
  private usuarioLogin: Object = {
    nombre: "",
    usuario: ""
  }

  private datosCompartidos: any;

  /* ************* VARIABLES COMPARTIDOS DE CREDITO ***********************/
  private participePrincipal = {};
  private participeSecundario = [{}]
  private credito = {}

  constructor() { }

  setDatos(datos: any) {
    this.datosCompartidos = datos;
  }

  getDatos() {
    return this.datosCompartidos;
  }
/*************** SETTER AND GETTER DE LOGIN ******************/
  public setUsuarioLogin(usuario: object) {
    this.usuarioLogin = usuario;
  }
  public getUsuarioLogin(): object {
    return this.usuarioLogin;
  }
/*************** SETTER AND GETTER DE CREDITOS ******************/
  public setParticipePrincipal(participePrincipal: any) {
    this.participePrincipal = participePrincipal;
  }
  public getParticipePrincipal(): object {
    return this.participePrincipal;
  }
  public setParticipeSecundario(participeSecundario: any) {
    this.participeSecundario = participeSecundario;
  }
  public getParticipeSecundario(): object {
    return this.participeSecundario;
  }
  public setCredito(credito: any) {
    this.credito = credito;
  }
  public getCredito(): object {
    return this.credito;
  }
}
