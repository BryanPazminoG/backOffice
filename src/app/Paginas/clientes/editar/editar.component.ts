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

  constructor(
    private flujoDatosService: FlujoDatosService,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.datosCliente = this.flujoDatosService.getDatos(); // Obtener datos del servicio
    console.log('Datos del cliente:', this.datosCliente);
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
      codigo: this.datosCliente.codigo,
      tipoCliente: this.datosCliente.tipoCliente,
      tipoIdentificacion: this.datosCliente.tipoIdentificacion,
      numeroIdentificacion: this.datosCliente.numeroIdentificacion,
      apellidos: this.datosCliente.apellidos,
      nombres: this.datosCliente.nombres,
      version: this.datosCliente.version,

      // Actualizables
      fechaNacimiento: this.datosCliente.fechaNacimiento,
      direccion: this.datosCliente.direccion,
      correoElectronico: this.datosCliente.correoElectronico,
      telefono: this.datosCliente.telefono,
      fechaModificacion: "2023-12-27T00:00:00",
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
