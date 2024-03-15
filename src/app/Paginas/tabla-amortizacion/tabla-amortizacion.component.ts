import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2'
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import { CreditoService } from 'src/app/Servicios/credito.service';
import { CuentaService } from 'src/app/Servicios/cuenta.service';

@Component({
  selector: 'app-tabla-amortizacion',
  templateUrl: './tabla-amortizacion.component.html',
  styleUrls: ['./tabla-amortizacion.component.css']
})
export class TablaAmortizacionComponent implements OnInit {

  participePrincipal = {
    'cod_cliente': 0,
    'codCuenta': '',
    'numeroCuenta': '',
    'tipo_identificacion': '',
    'numero_identificacion': '',
    'apellidos': '',
    'nombres': '',
    'razonSocial': '',
    'direccion': '',
    'telefono': '',
    'correo_electronico': '',
  };
  participeSecundario = [{
    'cod_cliente': '',
    'numeroCuenta': '',
    'numero_identificacion': '',
    'apellidos': '',
    'nombres': '',
    'razonSocial': '',
  }];

  credito = {
    'codTipoCredito': 0,
    'codCliente': 0,
    'tasaInteres': 0,
    'monto': 0,
    'plazo': 0,
    'fechaCreacion': '',
  };

  preTablaPagos = [{
    'codCuota': 0,
    'fechaPlanificadaPago': '',
    'capital': '',
    'interes': '',
    'montoCuota': '',
    'capitalRestante': ''
  }];

  @ViewChild('contenedor', { static: false }) tablaAmortizacion!: ElementRef; // Hace una referencia de una parte del html para el uso en la lógica

  constructor(private router: Router, private creditoService: CreditoService, private cuentaService: CuentaService, private flujoDatosService: FlujoDatosService) {
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

  cargarTablaAmortizacion() {

    // let tasaInteres = this.credito.tasaInteres;
    // let montoPrestamo = this.credito.monto;
    // let numeroPagos = this.credito.plazo;
    // if (tasaInteres > 0 && montoPrestamo > 0 && numeroPagos > 0) {

    //   this.creditoService.postTablaPagAPI(tasaInteres, montoPrestamo, numeroPagos).subscribe(
    //     (data) => {
    //       if (data) {
    //         this.preTablaPagos = data;
    //       }
    //     },
    //     (error) => {
    //       console.error('Error al hacer la solicitud:', error);
    //     }
    //   );
    // }

    let transaccionCreditoOrigen = {
      "codCuenta": this.participePrincipal.codCuenta,
      "valorDebe": this.credito.monto,
      "canal": "BOF"
    }

    this.cuentaService.postTransaccionAPI(transaccionCreditoOrigen).subscribe(
      (data) => {
    //     this.cuentaService.postTransaccionAPI(transaccionCreditoDestino).subscribe(
    //       (data) => {
            let registroCredito = {
              "codTipoCredito": this.credito.codTipoCredito,
              "codTransaccion": "1568Sasdw1854",
              "codCliente": this.participePrincipal.numero_identificacion,
              "numeroCuenta": this.participePrincipal.numeroCuenta,
              "monto": this.credito.monto,
              "plazo": this.credito.plazo,
              "numeroCuotas": this.credito.plazo,
              "cuotasPagadas": 0,
              "capitalPendiente": this.credito.monto,
              "tasaInteres": this.credito.tasaInteres,
              "canalTransaccion": "BOF",
              "estado": "VIG",
              "fechaAprobacion": new Date(),
              "fechaDesembolso": new Date(),
            }

            this.creditoService.postCreditoAPI(registroCredito).subscribe(
              (data) => {
                if (data) {
                  let idCredito = data;
                  let creditoIntRegistroP = {
                    "tipo": "PRI",
                    "codCredito": idCredito,
                    "codCliente": registroCredito.codCliente,
                  }
                  this.creditoService.postCredIntAPI(creditoIntRegistroP).subscribe(
                    (data) => {
                      if (data) {
                      }
                    },
                    (error) => {
                      console.error('Error al hacer la solicitud:', error);
                    }
                  );
                  let date = new Date();
                  this.participeSecundario.forEach((participante) => {
                    let creditoIntRegistroS = {
                      "tipo": "SEC",
                      "codCredito": idCredito,
                      "codCliente": participante.cod_cliente,
                    }
                    this.creditoService.postCredIntAPI(creditoIntRegistroS).subscribe(
                      (data) => {
                        if (data) {
                        }
                      },
                      (error) => {
                        console.error('Error al hacer la solicitud:', error);
                      }
                    );
                  });
                  let tablaAmortizacion = {
                    "codCredito": data,
                    "monto": registroCredito.monto,
                    "numeroCuotas": registroCredito.numeroCuotas,
                    "tasaInteres": registroCredito.tasaInteres
                  }
                  this.creditoService.postTablaPagAPI(tablaAmortizacion).subscribe(
                      (data) => {
                        if (data) {
                          console.log(data);
                          this.preTablaPagos = data;
                          console.log(this.preTablaPagos)
                        }
                      },
                      (error) => {
                        console.error('Error al hacer la solicitud:', error);
                      }
                    );
                }
              },
              (error) => {
                console.error('Error al hacer la solicitud:', error);
              }
            );
          }
        );
  }
  generarCadenaAlfanumerica(longitud: number) {
    const caracteres = "0123456789abcdefABCDEF";
    const bytes = new Uint8Array(longitud / 2);

    crypto.getRandomValues(bytes);

    const cadenaAlfanumerica = Array.from(bytes, byte => caracteres[(byte & 0xf0) >> 4] + caracteres[byte & 0x0f]).join('');

    return cadenaAlfanumerica;
  }
  crearCredito() {
    Swal.fire({
      icon: "success",
      title: "Listo",
      text: "Tabla de amortizacion impresa",
      showConfirmButton: false,
      timer: 2500
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.router.navigate(["creditos"]);
      }
    });

    // let transaccionCreditoOrigen = {
    //   "codCuentaOrigen": 1,
    //   "codCuentaDestino": this.participePrincipal.codCuenta,
    //   "valorDebe": this.credito.monto,
    //   "valorHaber": 0,
    //   "tipoTransaccion": "TEN",
    //   "detalle": "PRESTAMO BANQUITO " + new Date(),
    //   "fechaCreacion": new Date(),
    // }
    // let transaccionCreditoDestino = {
    //   "codCuentaOrigen": this.participePrincipal.codCuenta,
    //   "codCuentaDestino": 1,
    //   "valorDebe": 0,
    //   "valorHaber": this.credito.monto,
    //   "tipoTransaccion": "TEN",
    //   "detalle": "PRESTAMO BANQUITO " + new Date(),
    //   "fechaCreacion": new Date(),
    // }


    // // this.cuentaService.postTransaccionAPI(transaccionCreditoOrigen).subscribe(
    // //   (data) => {
    // //     this.cuentaService.postTransaccionAPI(transaccionCreditoDestino).subscribe(
    // //       (data) => {
    //         let registroCredito = {
    //           "codTipoCredito": this.credito.codTipoCredito,
    //           "codTransaccion": "asd",
    //           "codCliente": this.participePrincipal.numero_identificacion,
    //           "numeroCuenta": this.participePrincipal.numeroCuenta,
    //           "monto": this.credito.monto,
    //           "plazo": this.credito.plazo,
    //           "numeroCuotas": this.credito.plazo,
    //           "cuotasPagadas": 0,
    //           "capitalPendiente": this.credito.monto,
    //           "tasaInteres": this.credito.tasaInteres,
    //           "canalTransaccion": "BOF",
    //           "estado": "VIG",
    //           "fechaAprobacion": new Date(),
    //           "fechaDesembolso": new Date(),
    //         }

    //         this.creditoService.postCreditoAPI(registroCredito).subscribe(
    //           (data) => {
    //             if (data) {
    //               let idCredito = data;
    //               let creditoIntRegistroP = {
    //                 "tipo": "PRI",
    //                 "codCredito": idCredito,
    //                 "codCliente": registroCredito.codCliente,
    //               }
    //               this.creditoService.postCredIntAPI(creditoIntRegistroP).subscribe(
    //                 (data) => {
    //                   if (data) {
    //                   }
    //                 },
    //                 (error) => {
    //                   console.error('Error al hacer la solicitud:', error);
    //                 }
    //               );
    //               let date = new Date();
    //               this.participeSecundario.forEach((participante) => {
    //                 let creditoIntRegistroS = {
    //                   "tipo": "SEC",
    //                   "codCredito": idCredito,
    //                   "codCliente": participante.cod_cliente,
    //                 }
    //                 this.creditoService.postCredIntAPI(creditoIntRegistroS).subscribe(
    //                   (data) => {
    //                     if (data) {
    //                     }
    //                   },
    //                   (error) => {
    //                     console.error('Error al hacer la solicitud:', error);
    //                   }
    //                 );
    //               });
    //               let tablaAmortizacion = {
    //                 "codCredito": data.codCredito,
    //                 "monto": registroCredito.monto,
    //                 "numeroCuotas": registroCredito.numeroCuotas,
    //                 "tasaInteres": registroCredito.tasaInteres
    //               }
    //               this.creditoService.postTablaPagAPI(tablaAmortizacion).subscribe(
    //                   (data) => {
    //                     if (data) {
    //                       this.preTablaPagos = data;
    //                     }
    //                   },
    //                   (error) => {
    //                     console.error('Error al hacer la solicitud:', error);
    //                   }
    //                 );


    //               // this.preTablaPagos.forEach((pagos) => {
    //               //   let tablaPagosRegistro = {
    //               //     "codCredito": idCredito,
    //               //     "codCuota": pagos.periodo,
    //               //     "capital": parseFloat(pagos.amortizacionPeriodo),
    //               //     "interes": parseFloat(pagos.interesPeriodo),
    //               //     "montoCuota": parseFloat(pagos.cuota),
    //               //     "capitalRestante": parseFloat(pagos.capitalPendiente),
    //               //     "fechaPlanificadaPago": pagos.fechaPlanificadoPago,
    //               //     "estado": "PEN",
    //               //     "fechaPagoEfectivo": "",
    //               //     "transaccionPago": ""
    //               //   }
    //               //   this.creditoService.postTablaPagAPI(tablaPagosRegistro).subscribe(
    //               //     (data) => {
    //               //       if (data) {

    //               //       }
    //               //     },
    //               //     (error) => {
    //               //       console.error('Error al hacer la solicitud:', error);
    //               //     }
    //               //   );
    //               // });
    //             }
    //           },
    //           (error) => {
    //             console.error('Error al hacer la solicitud:', error);
    //           }
    //         );
    //         // }

    //         //**************************************************************** */
    // //       }
    // //     );
    // //   },
    // //   (error) => {
    // //     console.error('Error al hacer la solicitud:', error);
    // //   }
    // // );

    this.imprimirTabla();
  }

  regresar() {
    this.router.navigate(["creditos"]);
  }

  formatoFecha(fechaOriginal: string) {
    const fecha = new Date(fechaOriginal);
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
    const day = fecha.getDate().toString().padStart(2, '0');

    const fechaFormateado = `${year}-${month}-${day}`;

    return fechaFormateado;
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
          pdf.addImage(imgData, 'SVG', 0, 0, imgWidthAjustado - 25, imgHeightAjustado);
          pageY += imgHeight;
        }
      );
    }
    pdf.save('tabla-amortizacion.pdf');
  }
}
