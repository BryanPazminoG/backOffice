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
  
  /******* LOGIN *********/
  private validacionLogin: boolean = false;
  private userLogin: string = "";
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
  public setValidacionLogin(userLogin: string) {
    localStorage.setItem("user", userLogin);
    this.userLogin = userLogin;
  }
  public getValidacionLogin(): string {
    return this.userLogin;
  }

  public closeSession(){
    localStorage.clear();
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
