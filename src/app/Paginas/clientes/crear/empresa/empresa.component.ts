import { Component } from '@angular/core';
import { FlujoDatosService } from '../../../../Servicios/flujo-datos.service';
import { ClienteService } from '../../../../Servicios/cliente.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent {

  constructor(
    private flujoDatosService: FlujoDatosService,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    console.log('Tipo Cliente:', this.flujoDatosService.getDatos());
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

}
