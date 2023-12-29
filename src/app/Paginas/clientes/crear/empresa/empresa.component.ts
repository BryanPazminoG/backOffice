import { Component } from '@angular/core';
import { FlujoDatosService } from '../../../../Servicios/flujo-datos.service';
import { ClienteService } from '../../../../Servicios/cliente.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent {
  tiposRelacion: any[] = [];
  tipoIdentificacion: string = '';
  numeroIdentificacion: string = '';
  clienteEncontrado: any = '';
  participantes: any[] = [];
  tipoSeleccionado: any = '';

  tipoCliente: string = '';

  constructor(
    private flujoDatosService: FlujoDatosService,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    console.log('Tipo Cliente:', this.flujoDatosService.getDatos());
    this.tipoCliente = this.flujoDatosService.getDatos();

    this.obtenerTiposRelacion();
  }

  usuario: string = 'BryanP98';
  identificacion: string = '';
  fechaConstitucion: Date | null = null;
  razonSocial: string = '';
  nombreComercial: string = '';
  direccion: string = '';
  correoElectronico: string = '';
  telefono: string = '';

  enviarDatosEmpresa(): void{
    const datosCliente = {
      codigo : 12,
      tipoCliente: "JUR",
      tipoIdentificacion: "RUC",
      numeroIdentificacion: this.identificacion,
      apellidos: null,
      nombres: null,
      fechaNacimiento: null,
      fechaConstitucion: this.fechaConstitucion,
      razonSocial: this.razonSocial,
      nombreComercial: this.nombreComercial,
      direccion: this.direccion,
      correoElectronico: this.correoElectronico,
      telefono: this.telefono,
      fechaModificacion: "2023-12-26T00:00:00", 
      version: 1
    };

    console.log(datosCliente);


    this.clienteService.enviarDatosEmpresa(datosCliente)
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

  obtenerTiposRelacion(): void {
    this.clienteService.obtenerTiposRelacion()
      .subscribe(
        data => {
          this.tiposRelacion = data;
        },
        error => {
          console.error('Error al obtener los tipos de relación:', error);
        }
      );
  }

  
  buscarCliente(): void {
    this.clienteService.buscarClientePorParametros(this.tipoIdentificacion, this.numeroIdentificacion).subscribe(
      (data) => {
        console.log('Cliente encontrado:', data);
        this.clienteEncontrado = data;
      },
      (error) => {
        console.error('Error al buscar cliente:', error);
      }
    );
  }

  agregarParticipante(): void {
    // Aquí puedes construir el objeto con la información del formulario
    const nuevoParticipante = {
      relacion: this.tipoSeleccionado,// Asignar el valor seleccionado del tipo de relación
      identificacion: this.numeroIdentificacion,
      nombres: this.clienteEncontrado.apellidos + ' ' + this.clienteEncontrado.nombres
    };

    // Agregar el nuevo participante al arreglo para la tabla
    this.participantes.push(nuevoParticipante);

    // Limpiar los campos después de agregar el participante si es necesario
    this.tipoSeleccionado = '';
    this.numeroIdentificacion = '';
    this.clienteEncontrado.apellidos = '';
    this.clienteEncontrado.nombres = '';
    // Lógica para limpiar el objeto clienteEncontrado y el campo de tipo de relación si es necesario

    // También puedes llamar a un método para enviar los datos al servicio aquí si es necesario
  }



}
