import { Component, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2'
import html2canvas  from 'html2canvas'; // Librería que convierte código HTML a imagenes
import jsPDF from 'jspdf'; // Librería para generar documentos PDF


@Component({
  selector: 'app-tabla-amortizacion',
  templateUrl: './tabla-amortizacion.component.html',
  styleUrls: ['./tabla-amortizacion.component.css']
})
export class TablaAmortizacionComponent {
  @ViewChild('contenedor', { static: false }) tablaAmortizacion!: ElementRef; // Hace una referencia de una parte del html para el uso en la lógica

  constructor() {
  }

  crearCredito() {
    Swal.fire({
      icon: "success",
      title: "Listo",
      text: "El credito se ha creado satisfactoriamente",
      showConfirmButton: false,
      timer: 1500
    });
    this.imprimirTabla();
  }

  async imprimirTabla() { // Función para imprimir contenido HTML
    const cardContainer = this.tablaAmortizacion.nativeElement; // Toma el contenido HTML 
    const pageWidth = 210;
    const pageHeight = 297;
    // Espacios de margen para el documento PDF
    const margin = 15;
    const topMargin = 10;
    // Dimenseiones para el documento PDF
    const maxWidth = pageWidth - 2 * margin;
    const maxHeight = pageHeight - topMargin - margin;
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
          pdf.addImage(imgData, 'SVG', imageX, imageY, imgWidthAjustado, imgHeightAjustado);
          pageY += imgHeight;
        }
      );
    }
    pdf.save('tabla-amortizacion.pdf');
  }
}
