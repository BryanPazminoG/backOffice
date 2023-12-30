import { Component } from '@angular/core';
import { FlujoDatosService } from '../../../../Servicios/flujo-datos.service';
import { ClienteService } from '../../../../Servicios/cliente.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})


export class PersonaComponent {
  constructor(
    private flujoDatosService: FlujoDatosService,
    private clienteService: ClienteService
  ) {}

  tipoPersona: String = "";

  ngOnInit() {
    console.log('Tipo Cliente:', this.flujoDatosService.getDatos());
  }

  usuario: string = 'BryanP98';
  identificacion: string = '';
  apellidos: string = '';
  nombres: string = '';
  fechaNacimiento: Date | null = null;
  direccion: string = '';
  correoElectronico: string = '';
  telefono: string = '';

  enviarDatosCliente(): void {

    const datosCliente = {
      codigo : 12,
      tipoCliente: "NAT",
      tipoIdentificacion: "CED",
      numeroIdentificacion: this.identificacion,
      apellidos: this.apellidos,
      nombres: this.nombres,
      fechaNacimiento: this.fechaNacimiento,
      fechaConstitucion: "0000-00-00",
      razonSocial: "",
      nombreComercial: "",
      direccion: this.direccion,
      correoElectronico: this.correoElectronico,
      telefono: this.telefono,
      fechaModificacion: "2023-12-26T00:00:00", 
      version: 1
    };

    console.log(datosCliente);


    this.clienteService.enviarDatosCliente(datosCliente)
    .subscribe(
      (respuesta) => {
        console.log('Datos enviados con éxito:', respuesta);
      },
      (error) => {
        // Manejar errores si la solicitud falla
        console.error('Error al enviar datos:', error);
      }
    );


  }
}
