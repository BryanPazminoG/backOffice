import { Component } from '@angular/core';
import { FlujoDatosService } from '../../../Servicios/flujo-datos.service';
import { ClienteService } from '../../../Servicios/cliente.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  datosCliente: any;
  formattedDate: string = '';

  constructor(
    private flujoDatosService: FlujoDatosService,
    private clienteService: ClienteService,
    private router: Router 
  ) {}

  ngOnInit() {
    this.datosCliente = this.flujoDatosService.getDatos(); // Obtener datos del servicio
    console.log('Datos del cliente:', this.datosCliente);
    this.formattedDate = this.formatDate(this.datosCliente.fechaNacimiento);
  }

  formatDate(dateString: string): string {
    // Extraer la parte de la fecha (YYYY-MM-DD) del formato completo
    const datePart = dateString.split('T')[0];
    return datePart;
}

  mensajeAprobado() {
    Swal.fire({
      title: 'Actualización Exitosa',
      text: 'Se ha actualizado exitosamente el usuario: '+this.datosCliente.nombres + " " + this.datosCliente.apellidos,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    })
  }

  actualizarDatosCliente() {
    const datosActualizados = {
      idCliente: this.datosCliente.id,
      codCliente: this.datosCliente.codCliente,
      tipoCliente: this.datosCliente.tipoCliente,
      tipoIdentificacion: this.datosCliente.tipoIdentificacion,
      numeroIdentificacion: this.datosCliente.numeroIdentificacion,
      apellidos: this.datosCliente.apellidos,
      nombres: this.datosCliente.nombres,
      version: this.datosCliente.version,

      fechaNacimiento: this.formattedDate,
      direcciones: [{
        tipo: this.datosCliente.direcciones[0].tipo,
        linea1: this.datosCliente.direcciones[0].linea1,
        linea2: this.datosCliente.direcciones[0].linea2,
        estado: this.datosCliente.direcciones[0].estado,
        codigoPostal: this.datosCliente.direcciones[0].codigoPostal
      }],
      correoElectronico: this.datosCliente.correoElectronico,
      telefonos: [{
        tipo: this.datosCliente.telefonos[0].tipo,
        estado: this.datosCliente.telefonos[0].estado,
        numero: this.datosCliente.telefonos[0].numero
      }],
      fechaModificacion: new Date(),
    };

    console.log(datosActualizados);

    this.clienteService.actualizarCliente(datosActualizados)
      .subscribe(
        (response) => {
          console.log('Cliente actualizado:', response);
          this.mensajeAprobado();
          this.router.navigate(['/clientes']);
          // Realizar acciones adicionales si es necesario
        },
        (error) => {
          console.error('Error al actualizar el cliente:', error);
          // Manejar el error adecuadamente
        }
      );

  }
}
