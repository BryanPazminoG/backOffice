import { Component } from '@angular/core';
import { FlujoDatosService } from '../../../../Servicios/flujo-datos.service';
import { ClienteService } from '../../../../Servicios/cliente.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})


export class PersonaComponent {
  constructor(
    private flujoDatosService: FlujoDatosService,
    private clienteService: ClienteService,
    private router: Router 
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
  tipoDireccion: string = '';
  linea1: string = '';
  linea2: string = '';
  codigoPostal: string = '';
  tipoTelefono: string = '';
  estadoTelefono: string = '';
  numeroTelefono: string = '';


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
              tipo: this.tipoDireccion,
              linea1: this.linea1,
              linea2: this.linea2,
              codigoPostal: this.codigoPostal,
              estado: "ACT"
          }
      ],
      telefonos: [
          {
              tipo: this.tipoTelefono,
              numero: this.numeroTelefono,
              estado: "ACT"
          }
      ]
  }

    this.clienteService.enviarDatosCliente(datosCliente)
    .subscribe(
      (respuesta) => {
        console.log('Datos enviados con éxito:', respuesta);
        this.mensajeAprobado();
        this.router.navigate(['/clientes']);

      },
      (error) => {
        console.error('Error al enviar datos:', error);
      }
    );


  }
}
