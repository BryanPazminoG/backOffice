import { Component } from '@angular/core';
import { FlujoDatosService } from '../../../Servicios/flujo-datos.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  tipoPersona: String = "";

  constructor(
    private flujoDatosService: FlujoDatosService,
    private router: Router
  ) {}

  onChangeTipoPersona() {
      console.log('Valor seleccionado:', this.tipoPersona);
      this.flujoDatosService.setDatos(this.tipoPersona);
  }

  crearTipoCliente(){
    if (this.tipoPersona === 'NAT') {
      this.router.navigate(['/clientes/crear/persona']);
    } else if (this.tipoPersona === 'JUR') {
      this.router.navigate(['/clientes/crear/empresa']);
    }
  }

}
