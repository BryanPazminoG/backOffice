import { Component } from '@angular/core';
import { ClienteService } from 'src/app/Servicios/cliente.service';
import { CuentaService } from 'src/app/Servicios/cuenta.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent {
  clienteIdentificacion = {
    'codigo': 0,
    'tipoIdentificacion': '',
    'numeroIdentificacion': '',
    'apellidos': '',
    'nombres': '',
  };
  cliente = [{}];

  identFirst = true;
  identValidacion = false;
  mensajeValidacion = "";

  constructor(private serviceCliente: ClienteService, private serviceCuenta: CuentaService) {
  }

  getCliente() {
    this.serviceCliente.buscarClientePorParametros(this.clienteIdentificacion.tipoIdentificacion, this.clienteIdentificacion.numeroIdentificacion).subscribe(
      (data) => {
        this.identFirst = false;
        this.identValidacion = true;
        if (data) {
          this.clienteIdentificacion = data;
        } else {
          this.identValidacion = false;
          this.mensajeValidacion = "Numero de Identificacion Incorrecta";
        }
      },
      (error) => {
        this.identValidacion = false;
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }
  addParticipante() {

    if (this.clienteIdentificacion.apellidos != "" && this.clienteIdentificacion.nombres != "") {
      let objetoEncontrado = this.cliente.find(objeto => {
        return JSON.stringify(objeto) === JSON.stringify(this.clienteIdentificacion);
      });
      if (!objetoEncontrado) {
        this.cliente.push({ ...this.clienteIdentificacion });

        let tableBody = document.getElementById('tbParticipante') as HTMLTableElement;
        let row = document.createElement('tr');

        let cell = document.createElement('td');
        let textP = document.createElement('p');
        let cell1 = document.createElement('td');
        let textP1 = document.createElement('p');
        let cell2 = document.createElement('td');
        let textP2 = document.createElement('p');
        let cell3 = document.createElement('td');
        let textP3 = document.createElement('p');
        let cell4 = document.createElement('td');

        let numberOfRows = tableBody.rows.length;
        textP.innerHTML = numberOfRows.toString();
        cell.appendChild(textP);
        row.appendChild(cell);

        textP1.innerHTML = this.clienteIdentificacion.tipoIdentificacion;
        cell1.appendChild(textP1);
        row.appendChild(cell1);

        textP2.innerHTML = this.clienteIdentificacion.numeroIdentificacion;
        cell2.appendChild(textP2);
        row.appendChild(cell2);

        textP3.innerHTML = this.clienteIdentificacion.apellidos + " " + this.clienteIdentificacion.nombres;
        cell3.appendChild(textP3);
        row.appendChild(cell3);

        var boton = document.createElement("button");
        boton.type = "button";
        boton.className = "btn btn-dark w-100";

        boton.onclick  = () => {
          this.EliminarFila(boton);
      };
        var icono = document.createElement("i");
        icono.className = "bi bi-x-lg";

        boton.appendChild(icono);
        cell4.appendChild(boton);
        row.appendChild(cell4);
        tableBody.appendChild(row);

        this.clienteIdentificacion = {
          'codigo': 0,
          'tipoIdentificacion': '',
          'numeroIdentificacion': '',
          'apellidos': '',
          'nombres': '',
        };
        this.identValidacion = true;

      } else {
        this.mensajeValidacion = "El cliente ya se encuentra agregado";
        this.identValidacion = false;
      }
    }
  }
  EliminarFila(event: any){
    var fila = event.closest('tr');
    if(fila){
      var cuartaColumnaElement = fila.querySelector('td:nth-child(3)');
      if (cuartaColumnaElement !== null) {
        var cuartaColumna = cuartaColumnaElement.textContent;

        let objetoLista = this.cliente.findIndex(objeto => {
          return JSON.stringify(objeto).includes(cuartaColumna);
        });
        if (objetoLista !== -1) {
            this.cliente.splice(objetoLista, 1);
        }
      }

    }
    fila.remove();
  }

  restDatosClientes() {
    this.clienteIdentificacion.codigo = 0;
    this.clienteIdentificacion.apellidos = '';
    this.clienteIdentificacion.nombres = '';
  }
  // generarNumeroCuenta() {
  //   const numeroAleatorio = Math.random();
  //   const numeroCadena = (numeroAleatorio * 1e10).toFixed(0);
  //   const numeroAleatorio10Digitos = numeroCadena.padStart(10, '0');
  //   return numeroAleatorio10Digitos;
  // }
  // crearCuenta() {
  //   if (this.clienteIdentificacion.codigo != 0) {

  //     let nuevaCuenta = {
  //       "numeroCuenta": this.generarNumeroCuenta(),
  //       "codTipoCuenta": "CTA_CORR",
  //       "codCliente": 1,
  //       "saldoContable": 5000.00,
  //       "saldoDisponible": 5000.00,
  //       "estado": "ACT",
  //       "fechaCreacion": "2023-12-28T22:34:32.928+00:00",
  //       "fechaUltimoCambio": "2023-12-28T22:34:32.928+00:00",
  //       "version": 1
  //     }
  //     this.serviceCuenta.postCuentaAPI(nuevaCuenta).subscribe(
  //       (data) => {
  //         if (data) {
  //           this.getCuentaByClienteAPI();
  //         }
  //       },
  //       (error) => {
  //         console.error('Error al hacer la solicitud:', error);
  //       }
  //     );
  //   }
  // }
}
