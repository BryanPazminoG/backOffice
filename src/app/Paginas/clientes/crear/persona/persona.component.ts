import { Component } from '@angular/core';
import { FlujoDatosService } from '../../../../Servicios/flujo-datos.service';
import { ClienteService } from '../../../../Servicios/cliente.service';
import Swal from 'sweetalert2'

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
  selectedValue: string = '';
  datosCliente = '';
  usuario: string = 'BryanP98';
  identificacion: string = '';
  apellidos: string = '';
  nombres: string = '';
  fechaNacimiento: Date | null = null;
  direccion: string = '';
  correoElectronico: string = '';
  telefono: string = '';

  mensajeAprobado() {
    Swal.fire({
      title: 'Creación Exitosa',
      text: 'Se ha creado exitosamente el usuario: '+this.nombres + " " + this.apellidos,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    })
  }

  enviarDatosCliente(): void {

    const datosCliente = {
      tipoIdentificacion: this.selectedValue,
      numeroIdentificacion: this.identificacion,
      apellidos: this.apellidos,
      nombres: this.nombres,
      fechaNacimiento: this.fechaNacimiento,
      correoElectronico: this.correoElectronico,
      fechaUltimoCambio: null,
      direcciones: [
          {
              "tipo": "Casa",
              "linea1": this.direccion,
              "linea2": "Juan Camacaro",
              "codigoPostal": "171100",
              "estado": "ACT"
          }
      ],
      telefonos: [
          {
              "tipo": "Personal",
              "numero": this.telefono,
              "estado": "ACT"
          }
      ]
  }

    this.clienteService.enviarDatosCliente(datosCliente)
    .subscribe(
      (respuesta) => {
        console.log('Datos enviados con éxito:', respuesta);
        this.mensajeAprobado();

      },
      (error) => {
        console.error('Error al enviar datos:', error);
      }
    );


  }
}
