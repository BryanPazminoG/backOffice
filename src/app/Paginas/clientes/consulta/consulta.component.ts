import { Component } from '@angular/core';
import { ClienteService } from '../../../Servicios/cliente.service';
import { FlujoDatosService } from '../../../Servicios/flujo-datos.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {
  tipoIdentificacion: string = '';
  numeroIdentificacion: string = '';
  clienteEncontrado: any;

  constructor(
    private clienteService: ClienteService,
    private flujoDatosService: FlujoDatosService // Agrega FlujoDatosService aquí
  ) { }

  buscarCliente(): void {
    this.clienteService.buscarClientePorParametros(this.tipoIdentificacion, this.numeroIdentificacion).subscribe(
      (data) => {
        console.log('Cliente encontrado:', data);
        this.clienteEncontrado = data;
        this.flujoDatosService.setDatos(data); 
      },
      (error) => {
        console.error('Error al buscar cliente:', error);
        // Manejar errores si es necesario
      }
    );
  }

}
