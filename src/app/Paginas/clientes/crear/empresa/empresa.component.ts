import { Component } from '@angular/core';
import { FlujoDatosService } from '../../../../Servicios/flujo-datos.service';
import { ClienteService } from '../../../../Servicios/cliente.service';
import Swal from 'sweetalert2'

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
  fechaInicio: any = '';

  tipoCliente: string = '';

  tipoSeleccionado: string = '';


  constructor(
    private flujoDatosService: FlujoDatosService,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.tipoCliente = this.flujoDatosService.getDatos();
  }

  

  //usuario: string = 'BryanP98';
  identificacion: string = '';
  fechaConstitucion: Date | null = null;
  razonSocial: string = '';
  nombreComercial: string = '';
  direccion: string = '';
  correoElectronico: string = '';
  telefono: string = '';


  buscarCliente(): void {
    this.clienteService.buscarClientePorParametros(this.tipoIdentificacion, this.numeroIdentificacion).subscribe(
      (data) => {
        this.clienteEncontrado = data;
      },
      (error) => {
        console.error('Error al buscar cliente:', error);
      }
    );
  }

  agregarParticipante(): void {
    const nuevoParticipante = {
      tipoIdentificacion: this.tipoIdentificacion,
      cedula: this.numeroIdentificacion,
      tipoRelacion: this.tipoSeleccionado,
      fechaInicio: this.fechaInicio, // Esto genera la fecha actual en formato ISO
      fechaFin: null,
      estado: 'ACT',
      fechaUltimoCambio: new Date().toISOString(),
      nombres: this.clienteEncontrado.apellidos + ' ' + this.clienteEncontrado.nombres,
      idCliente: this.clienteEncontrado.codCliente
    };

    console.log(nuevoParticipante);

    // Agregar el nuevo participante al arreglo para la tabla
    this.participantes.push(nuevoParticipante);

    // Limpiar los campos después de agregar el participante si es necesario
    this.tipoSeleccionado = '';
    this.numeroIdentificacion = '';
    this.clienteEncontrado.apellidos = '';
    this.clienteEncontrado.nombres = '';
  }

  tipoDireccion: string = ''; 
  linea1: string = '';
  linea2: string = '';
  codigoPostal: string = '';

  enviarDatosEmpresa(): void{

    const listaDeParticipantes = this.participantes.map((participante) => {
        return {
            codCliente: participante.idCliente,
            tipoRelacion: participante.tipoRelacion,
            fechaInicio: participante.fechaInicio,
            fechaFin: participante.fechaFin,
            estado: participante.estado,
            fechaUltimoCambio: participante.fechaUltimoCambio
        };
    });


    const datosCliente = {
      tipoIdentificacion: "RUC",
      numeroIdentificacion: this.identificacion,
      fechaConstitucion: this.fechaConstitucion,      
      razonSocial: this.razonSocial,
      nombreComercial: this.nombreComercial,
      direccion: 
        {
            tipo: this.tipoDireccion, // Usa el valor seleccionado en el campo tipoDireccion
            linea1: this.linea1,
            linea2: this.linea2,
            codigoPostal: this.codigoPostal,
            estado: "ACT"
        }
      ,
      telefono: this.telefono,
      correoElectronico: this.correoElectronico,
      miembros: listaDeParticipantes
    };

    console.log(datosCliente);

    this.clienteService.enviarDatosEmpresa(datosCliente).subscribe(
      (response) => {
        console.log('Datos empresa con exito: ', response);
        this.mensajeAprobado();
      },
      (error) => {
        console.error('Error al enviar empresa:', error);
      }
    )


  }


  // enviarClientesAsociadosEmpresa(codigoEmpresa: number, tipoIdentificacion: string, numeroIdentificacion: string, tipoRelacion: string){
  //   this.clienteService.crearRelacionClientePersona(codigoEmpresa, tipoIdentificacion, numeroIdentificacion, tipoRelacion)
  //   .subscribe(
  //     (respuesta) => {
  //       console.log('Datos enviados con éxito:', respuesta);
  //     },
  //     (error) => {
  //       // Manejar errores si la solicitud falla
  //       console.error('Error al enviar datos:', error);
  //     }
  //   );
  // }

  mensajeAprobado() {
    Swal.fire({
      title: 'Creación Exitosa',
      text: 'Se ha creado exitosamente la empresa: '+this.nombreComercial,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    })
  }
  
}
