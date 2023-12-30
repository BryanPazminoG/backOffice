import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2'
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import { CreditoService } from 'src/app/Servicios/credito.service';


@Component({
  selector: 'app-tabla-amortizacion',
  templateUrl: './tabla-amortizacion.component.html',
  styleUrls: ['./tabla-amortizacion.component.css']
})
export class TablaAmortizacionComponent implements OnInit {

  participePrincipal = {
    'cod_cliente': '',
    'numero_identificacion': '',
    'apellidos': '',
    'nombres': '',
    'direccion': '',
    'telefono': '',
    'correo_electronico': '',

  };
  participeSecundario = [{
    'cod_cliente': '',
    'numero_identificacion': '',
    'apellidos': '',
    'nombres': '',
  }];

  credito = {
    'codTipoCredito': 0,
    'codCliente': 0,
    'fecha_creacion': '',
    'tasaInteres': 0,
    'monto': 0,
    'plazo': 0,
  };

  preTablaPagos = [{
    'periodo': 0,
    'cuota': '',
    'interesPeriodo': '',
    'amortizacionPeriodo': '',
    'capitalPendiente': ''
  }];

  @ViewChild('contenedor', { static: false }) tablaAmortizacion!: ElementRef; // Hace una referencia de una parte del html para el uso en la lógica

  constructor(private router: Router, private creditoService:CreditoService, private flujoDatosService: FlujoDatosService) {
  }
  ngOnInit(): void {
    this.cargarDatos();
    this.cargarTablaAmortizacion();
  }

  cargarDatos() {
    this.participePrincipal = <any>this.flujoDatosService.getParticipePrincipal();
    this.participeSecundario = <any>this.flujoDatosService.getParticipeSecundario();
    this.credito = <any>this.flujoDatosService.getCredito();
  }

  cargarTablaAmortizacion(){

    let tasaInteres = this.credito.tasaInteres;
    let montoPrestamo = this.credito.monto;
    let numeroPagos = this.credito.plazo;
    if(tasaInteres > 0 && montoPrestamo > 0 && numeroPagos > 0){

      this.creditoService.getPreTablaPagoAPI(tasaInteres, montoPrestamo, numeroPagos).subscribe(
        (data) => {
          if (data) {
            this.preTablaPagos = data;
          }
        },
        (error) => {
          console.error('Error al hacer la solicitud:', error);
        }
      );
    }
  }
  crearCredito() {
    Swal.fire({
      icon: "success",
      title: "Listo",
      text: "El credito se ha creado satisfactoriamente",
      showConfirmButton: false,
      timer: 2500
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.router.navigate(["creditos"]);
      }
    });

    /******************************************************/

    var numeroOperacion = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');

    let registroCredito = {
      "codTipoCredito": this.credito.codTipoCredito,
      "codCliente": this.credito.codCliente,
      "numeroOperacion": numeroOperacion,
      "fechaCreacion": this.credito.fecha_creacion,
      "monto": this.credito.monto,
      "plazo": this.credito.plazo,
      "tasaInteres": this.credito.tasaInteres,
      "estado": "VIG",
      "fechaDesembolso": this.credito.fecha_creacion,
      "fechaUltimoPago": null,
      "capitalPendiente": this.credito.monto,
      "fechaUltimoCambio": this.credito.fecha_creacion,
    }

    this.creditoService.postCreditoAPI(registroCredito).subscribe(
      (data) => {
        if (data) {
          console.log("Data Almacenado");
          let idCredito = data.codCredito;
          let creditoIntRegistroP = {
            "tipo": "PRI",
            "fechaUltimoCambio": this.credito.fecha_creacion,
            "pk": {
                "codCredito": idCredito,
                "codCliente": this.credito.codCliente,
            }
          }
          this.creditoService.postCredIntAPI(creditoIntRegistroP).subscribe(
            (data) => {
              if (data) {
                console.log("Data Almacenado");
              }
            },
            (error) => {
              console.error('Error al hacer la solicitud:', error);
            }
          );
          let date = this.credito.fecha_creacion;
          this.participeSecundario.forEach((participante) => {
            let creditoIntRegistroS = {
              "tipo": "SEC",
              "fechaUltimoCambio": date,
              "pk": {
                  "codCredito": idCredito,
                  "codCliente": participante.cod_cliente,
              }
            }
            this.creditoService.postCredIntAPI(creditoIntRegistroS).subscribe(
              (data) => {
                if (data) {
                  console.log("Data Almacenado");
                }
              },
              (error) => {
                console.error('Error al hacer la solicitud:', error);
              }
            );
          });
          this.preTablaPagos.forEach((pagos) => {
            let tablaPagosRegistro = {
              "capital": parseFloat(pagos.amortizacionPeriodo),
              "interes": parseFloat(pagos.interesPeriodo),
              "montoCuota": parseFloat(pagos.cuota),
              "capitalRestante": parseFloat(pagos.capitalPendiente),
              "fechaPlanificadaPago": date,
              "estado": "PEN",
              "fechaPagoEfectivo": date,
              "transaccionPago": "",
              "fechaUltimoCambio": date,
              "pk": {
                  "codCredito": idCredito,
                  "codCuota": pagos.periodo
              }
            }
            this.creditoService.postTablaPagAPI(tablaPagosRegistro).subscribe(
              (data) => {
                if (data) {
                  console.log("Data Almacenado");
                }
              },
              (error) => {
                console.error('Error al hacer la solicitud:', error);
              }
            );
          });
        }
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );

    this.imprimirTabla();
  }

  regresar(){
    this.router.navigate(["creditos"]);
  }

  async imprimirTabla() { // Función para imprimir contenido HTML
    const cardContainer = this.tablaAmortizacion.nativeElement; // Toma el contenido HTML 
    const pageWidth = 210;
    const pageHeight = 297;
    // Espacios de margen para el documento PDF
    const margin = 15;
    const topMargin = 10;
    // Dimenseiones para el documento PDF
    const maxWidth = (pageWidth - 2 * margin);
    const maxHeight = (pageHeight - topMargin - margin);
    // Dimenseiones de la Imagen
    let imgWidth = cardContainer.offsetWidth;
    let imgHeight = maxHeight * 3.80;
    // Numero de imagenes de la factura
    const numImg = Math.ceil(cardContainer.offsetHeight / imgHeight);
    //Auxiliar: posicion eje Y de cada img con respecto al html 
    let pageY = 0;
    const pdf = new jsPDF('p', 'mm', 'a4'); // Configuraciones del documento PDF

    for (let index = 0; index < numImg; index++) {
      await html2canvas(cardContainer, {
        x: 0,
        y: pageY,
        width: imgWidth,
        height: imgHeight
      }).then( // Toma el contenido y lo convierte en una imagen
        (canvas) => {
          const imgData = canvas.toDataURL('image/png'); // Guarda el contenido tomado en la variable imgData
          // Calcula el ancho y alto de la imagen ajustada   
          let imgHeightAjustado = 0;
          let imgWidthAjustado = 0;
          if (imgWidth > maxWidth) {
            imgHeightAjustado = (imgHeight * maxWidth) / imgWidth;
            imgWidthAjustado = maxWidth;
          }

          if (imgHeight > maxHeight) {
            imgWidthAjustado = (imgWidth * maxHeight) / imgHeight;
            imgHeightAjustado = maxHeight;
          }
          const imageX = margin + (maxWidth - imgWidthAjustado) / 2;
          const imageY = topMargin + (maxHeight - imgHeightAjustado) / 2;

          if (index > 0) pdf.addPage();
          pdf.addImage(imgData, 'SVG', 0, 0, imgWidthAjustado-25, imgHeightAjustado);
          pageY += imgHeight;
        }
      );
    }
    pdf.save('tabla-amortizacion.pdf');
  }
}
