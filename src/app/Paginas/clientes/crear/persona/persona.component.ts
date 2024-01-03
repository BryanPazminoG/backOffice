import { Component } from '@angular/core';
import { FlujoDatosService } from '../../../../Servicios/flujo-datos.service';
import { ClienteService } from '../../../../Servicios/cliente.service';
import Swal from "sweetalert2";
@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})

export class PersonaComponent {
  tipoPersona: string = '';
  usuario: string = 'BryanP98';
  identificacion: string = '';
  apellidos: string = '';
  nombres: string = '';
  fechaNacimiento: Date | null = null;
  direccion: string = '';
  correoElectronico: string = '';
  telefono: string = '';
  identificacionValida: boolean = true;
  tipoIdentificacion: string = '';
  mensajeErrorIdentificacion: string = "";
  telefonoValido: boolean = true;
  constructor(
    private flujoDatosService: FlujoDatosService,
    private clienteService: ClienteService
  ) {}
  validarIdentificacion(): void {
    if (this.tipoIdentificacion === "CED") {
      this.identificacionValida = this.validarCedula(this.identificacion);
      this.mensajeErrorIdentificacion = this.identificacionValida ? "" : "La cédula debe contener solo números y tener 10 dígitos.";
    } else if (this.tipoIdentificacion === "PAS") {
      this.validarPasaporte();
    } else {
      this.identificacionValida = true;
      this.mensajeErrorIdentificacion = "";
    }
  }

  validarPasaporte(): void {
    // Longitud mínima del pasaporte, puedes ajustarla según tus requisitos
    const longitudMinima = 6;

    // Validar la longitud del pasaporte
    if (this.identificacion.length < longitudMinima) {
      this.identificacionValida = false;
      this.mensajeErrorIdentificacion = "El pasaporte debe tener al menos " + longitudMinima + " caracteres.";
    } else {
      this.identificacionValida = true;
      this.mensajeErrorIdentificacion = "";
    }
  }
  validarCedula(cedula: string): boolean {
    if (cedula.length === 10) {
      const digitoRegion = cedula.substring(0, 2);
      if (digitoRegion >= "01" && digitoRegion <= "24") {
        const ultimoDigito = Number(cedula.substring(9, 10)); // Corregir esta línea
        const pares = Number(cedula.substring(1, 2)) + Number(cedula.substring(3, 4)) + Number(cedula.substring(5, 6)) + Number(cedula.substring(7, 8));

        let numeroUno: any = cedula.substring(0, 1);
        numeroUno = (numeroUno * 2);
        if (numeroUno > 9) {
          numeroUno = (numeroUno - 9);
        }

        let numeroTres: any = cedula.substring(2, 3);
        numeroTres = (numeroTres * 2);
        if (numeroTres > 9) {
          numeroTres = (numeroTres - 9);
        }

        let numeroCinco: any = cedula.substring(4, 5);
        numeroCinco = (numeroCinco * 2);
        if (numeroCinco > 9) {
          numeroCinco = (numeroCinco - 9);
        }

        let numeroSiete: any = cedula.substring(6, 7);
        numeroSiete = (numeroSiete * 2);
        if (numeroSiete > 9) {
          numeroSiete = (numeroSiete - 9);
        }

        let numeroNueve: any = cedula.substring(8, 9);
        numeroNueve = (numeroNueve * 2);
        if (numeroNueve > 9) {
          numeroNueve = (numeroNueve - 9);
        }

        const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;
        const sumaTotal = (pares + impares);
        const primerDigitoSuma = String(sumaTotal).substring(0, 1);
        const decena = (Number(primerDigitoSuma) + 1) * 10;
        let digitoValidador = decena - sumaTotal;

        if (digitoValidador === 10) {
          digitoValidador = 0;
        }

        if (digitoValidador === ultimoDigito) {
          return true;
        } else {
          return false;
        }

      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  apellidosValidos: boolean = true;

  validarApellidos(): void {
    const regexApellidos = /^[A-Za-z\s]+$/;
    this.apellidosValidos = regexApellidos.test(this.apellidos);
  }

  nombresValidos: boolean = true;

  validarNombres(): void {
    const regexNombres = /^[A-Za-z\s]+$/;
    this.nombresValidos = regexNombres.test(this.nombres);
  }

  correoValido: boolean = true;

  validarCorreoElectronico(): void {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.correoValido = regexCorreo.test(this.correoElectronico);
  }
  validarTelefono(): void {
    const regexTelefono = /^[0-9]+$/;

    this.telefonoValido = regexTelefono.test(this.telefono);
  }

  enviarDatosCliente(): void {
    this.validarIdentificacion();

    if (!this.identificacionValida) {
      return; // Evitar enviar datos si la identificación no es válida
    }


    const datosCliente = {
      codigo: 12,
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
          if (respuesta){
            Swal.fire({
              title: "Creacion Exitosa!",
              text: "Genial!",
              icon: "success"
            });

          }else{
            Swal.fire({
              title: "Creacion Erronea!",
              text: "Ingrese todos los campos!",
              icon: "error"
            });
          }
        },
        (error) => {
          // Manejar errores si la solicitud falla
          console.error('Error al enviar datos:', error);
        }
      );

  }
}
