import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/Servicios/cliente.service';
import { CreditoService } from 'src/app/Servicios/credito.service';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.css']
})
export class CreditosComponent implements OnInit {

  participantes = {
    'cod_cliente': '',
    'tipo_identificacion': '',
    'numero_identificacion': '',
    'apellidos': '',
    'nombres': '',
  };
  listaTipoCredito = [{
    'cod_tipo_credito': 0,
    'nombre': '',
  }];
  tipoCredito = {
    'cod_tipo_credito': 0,
    'nombre': '',
    'plazo_minimo': 0,
    'plazo_maximo': 0,
    'monto_minimo': 0,
    'monto_maximo': 0,
  };

  participePrincipal = {
    'cod_cliente': '',
    'tipo_identificacion': '',
    'numero_identificacion': '',
    'apellidos': '',
    'nombres': '',
    'direccion': '',
    'telefono': '',
    'correo_electronico': '',
  };
  participeSecundario = [{}];
  credito = {
    'cod_cliente': 0,
    'fecha_creacion': '',
    'monto': 0,
    'plazo': 0,
  };

  identPFirst = true;
  identPValidacion = false;
  identSFirst = true;
  identSValidacion = false;
  existencia = false;

  constructor(
    private router: Router,
    private serviceCredito: CreditoService,
    private serviceCliente: ClienteService,
    private flujoDatosService: FlujoDatosService
  ) { }

  ngOnInit(): void {
    this.getAllTipoCredito();
  }

  getClienteP() {
    this.participePrincipal.cod_cliente = '';
    this.participePrincipal.apellidos = '';
    this.participePrincipal.nombres = '';
    this.participePrincipal.direccion = '';
    this.participePrincipal.telefono = '';
    this.participePrincipal.correo_electronico = '';

    this.serviceCliente.buscarClientePorParametros(this.participePrincipal.tipo_identificacion, this.participePrincipal.numero_identificacion).subscribe(
      (data) => {
        if (data) {
          this.identPFirst = false;

          this.participePrincipal = {
            'cod_cliente': data.codigo,
            'tipo_identificacion': data.tipoIdentificacion,
            'numero_identificacion': data.numeroIdentificacion,
            'apellidos': data.apellidos,
            'nombres': data.nombres,
            'direccion': data.direccion,
            'telefono': data.telefono,
            'correo_electronico': data.correoElectronico,
          }
          this.identPValidacion = true;
        } else this.identPValidacion = false;
        console.log(this.participePrincipal);
        console.log(this.identPFirst);
        console.log(this.identPValidacion);
      },
      (error) => {
        this.identPValidacion = false;
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }

  getClienteS() {
    this.participantes['cod_cliente'] = '';
    this.participantes['apellidos'] = '';
    this.participantes['nombres'] = '';

    this.serviceCliente.buscarClientePorParametros(this.participantes['tipo_identificacion'], this.participantes['numero_identificacion']).subscribe(
      (data) => {
        this.identSFirst = false;
        if (data) {
          this.participantes['cod_cliente'] = data.codigo;
          this.participantes['tipo_identificacion'] = data.tipoIdentificacion;
          this.participantes['numero_identificacion'] = data.numeroIdentificacion;
          this.participantes['apellidos'] = data.apellidos;
          this.participantes['nombres'] = data.nombres;
          this.identSValidacion = true;
        } else this.identSValidacion = false;
      },
      (error) => {
        this.identSValidacion = false;
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }
  addParticipante() {

    if (this.participantes['nombres'] != "" && this.participantes['apellidos'] != "") {
      let objetoEncontrado = this.participeSecundario.find(objeto => {
        return JSON.stringify(objeto) === JSON.stringify(this.participantes);
      });

      if (objetoEncontrado) {
        console.log('Objeto encontrado:', objetoEncontrado);
      } else {
        console.log('Objeto no encontrado', objetoEncontrado);
      }

      if (!objetoEncontrado) {
        this.existencia = false;
        this.participeSecundario.push({ ...this.participantes });

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
        let numberOfRows = tableBody.rows.length;
        textP.innerHTML = numberOfRows.toString();
        cell.appendChild(textP);
        row.appendChild(cell);

        textP1.innerHTML = this.participantes.tipo_identificacion;
        cell1.appendChild(textP1);
        row.appendChild(cell1);

        textP2.innerHTML = this.participantes.numero_identificacion;
        cell2.appendChild(textP2);
        row.appendChild(cell2);

        textP3.innerHTML = this.participantes.apellidos + " " + this.participantes.nombres;
        cell3.appendChild(textP3);
        row.appendChild(cell3);
        tableBody.appendChild(row);

        this.participantes['cod_cliente'] = '';
        this.participantes['tipo_identificacion'] = '';
        this.participantes['numero_identificacion'] = '';
        this.participantes['apellidos'] = '';
        this.participantes['nombres'] = '';

      } else this.existencia = true;
    }
  }

  getAllTipoCredito() {
    this.listaTipoCredito = [{ 'cod_tipo_credito': 1, 'nombre': 'CRÉDITO DE CONSUMO' }, { 'cod_tipo_credito': 2, 'nombre': 'CRÉDITO DOS' }];
    // this.serviceCredito.getAllAPI().subscribe(
    //   (data) => {
    //     this.tipoCredito = ["CRÉDITO DE CONSUMO", "asda", "data"];
    //   },
    //   (error) => {
    //     console.error('Error al hacer la solicitud:', error);
    //   }
    // );
  }
  getIdTipoCredito(event: any) {
    const valorSeleccionado = event.target.value;
    console.log('Valor seleccionado:', valorSeleccionado);

    this.tipoCredito = {
      'cod_tipo_credito': 1,
      'nombre': 'CRÉDITO DE CONSUMO',
      'plazo_minimo': 6,
      'plazo_maximo': 36,
      'monto_minimo': 1000,
      'monto_maximo': 5000,
    };

    // if(valorSeleccionado != 0){
    //   this.serviceCredito.getByIdAPI(valorSeleccionado).subscribe(
    //     (data) => {

    //     },
    //     (error) => {
    //       console.error('Error al hacer la solicitud:', error);
    //     }
    //   );
    // }
  }
  validacionesEnteros(event: any, min: number, max: number) {
    let valor = Math.round(event.target.value);
    if (valor < min) event.target.value = min;
    else if (valor > max) event.target.value = max;
    else event.target.value = valor;
  }

  fechaActual() {
    let fechaActual = new Date();
    let año = fechaActual.getFullYear();
    let mes = fechaActual.getMonth() + 1; // Los meses son indexados desde 0, así que sumamos 1
    let dia = fechaActual.getDate();

    let fechaFormateada = `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
    console.log(fechaFormateada);
    return fechaFormateada;
  }
  continuar() {
    // this.participeSecundario = [{
    //   'cod_cliente': '1',
    //   'numero_identificacion': '17352156',
    //   'apellidos': 'Garcia Naverrete',
    //   'nombres': 'Ricky Garcia',
    // }, {
    //   'cod_cliente': '2',
    //   'numero_identificacion': '18987654',
    //   'apellidos': 'Juan Pepe',
    //   'nombres': 'El pepe',
    // },
    // {
    //   'cod_cliente': '3',
    //   'numero_identificacion': '156123456',
    //   'apellidos': 'Navarrete Navarrete',
    //   'nombres': 'Lourdes Amada',
    // }]

    this.credito.fecha_creacion = this.fechaActual();
    // this.credito = {
    //   'cod_cliente': 1,
    //   'fecha_creacion': '28/12/2023',
    //   'monto': 1000,
    //   'plazo': 6,
    // }

    this.flujoDatosService.setParticipePrincipal(this.participePrincipal);
    this.flujoDatosService.setParticipeSecundario(this.participeSecundario);
    this.flujoDatosService.setCredito(this.credito);

    this.router.navigate(["creditos/amortizacion"]);
  }
  regresar() {
    this.router.navigate(["clientes"]);
  }
}