import { Component } from '@angular/core';
import { FlujoDatosService } from '../../../Servicios/flujo-datos.service';
import { ClienteService } from '../../../Servicios/cliente.service';
import Swal from 'sweetalert2'

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
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.datosCliente = this.flujoDatosService.getDatos(); // Obtener datos del servicio
    console.log('Datos del cliente:', this.datosCliente);
    // Formatear la fecha
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
      // Construye un objeto con los datos actualizados que deseas enviar al servidor
      idCliente: this.datosCliente.idCliente,
      tipoCliente: this.datosCliente.tipoCliente,
      tipoIdentificacion: this.datosCliente.tipoIdentificacion,
      numeroIdentificacion: this.datosCliente.numeroIdentificacion,
      apellidos: this.datosCliente.apellidos,
      nombres: this.datosCliente.nombres,
      version: this.datosCliente.version,

      // Actualizables
      fechaNacimiento: this.formattedDate,
      direcciones: [{
        tipo: this.datosCliente.direcciones[0].tipo,
        linea1: this.datosCliente.direcciones[0].linea1,
        linea2: this.datosCliente.direcciones[0].linea2,
        estado: this.datosCliente.direcciones[0].estado,
        codigo_postal: this.datosCliente.direcciones[0].codigoPostal
      }],
      correoElectronico: this.datosCliente.correoElectronico,
      telefonos: [{
        tipo: this.datosCliente.telefonos[0].tipo,
        estado: this.datosCliente.telefonos[0].estado,
        numero: this.datosCliente.telefonos[0].numero
      }],
      fechaModificacion: new Date(),
    };
    this.clienteService.actualizarCliente(datosActualizados)
      .subscribe(
        (response) => {
          console.log('Cliente actualizado:', response);
          this.mensajeAprobado();
          // Realizar acciones adicionales si es necesario
        },
        (error) => {
          console.error('Error al actualizar el cliente:', error);
          // Manejar el error adecuadamente
        }
      );

  }
}
