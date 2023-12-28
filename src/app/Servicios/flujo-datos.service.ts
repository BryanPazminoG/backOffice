import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlujoDatosService {

  private datosCompartidos: any;

  constructor() { }

  setDatos(datos: any) {
    this.datosCompartidos = datos;
  }

  getDatos() {
    return this.datosCompartidos;
  }
}
