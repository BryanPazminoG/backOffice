import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreditoService } from 'src/app/Servicios/credito.service';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.css']
})
export class CreditosComponent implements OnInit {

  participantes: { [key: string]: string } = {
    'tipoIdentificacion': '',
    'identificacion': '',
    'nombres': ''
  }
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
  }

  participePrincipal = {
    'cod_cliente': '',
    'numero_identificacion': '',
    'apellidos': '',
    'nombres': '',
    'direccion': '',
    'telefono': '',
    'correo_electronico': '',

  }
  participeSecundario = [{
    'cod_cliente': '',
    'numero_identificacion': '',
    'apellidos': '',
    'nombres': '',
  }]
  credito = {
    'cod_cliente': 0,
    'fecha_creacion': '',
    'monto': 0,
    'plazo': 0,
  }

  constructor(private router: Router, private serviceCredito: CreditoService, private flujoDatosService: FlujoDatosService) { }
  ngOnInit(): void {
    this.getAllTipoCredito();
  }

  addParticipante() {
    let tableBody = document.getElementById('tbParticipante') as HTMLTableElement;

    let row = document.createElement('tr');
    let cell = document.createElement('td');
    let textP = document.createElement('p');
    let numberOfRows = tableBody.rows.length;
    textP.innerHTML = numberOfRows.toString();
    cell.appendChild(textP);
    row.appendChild(cell);
    tableBody.appendChild(row);

    for (let propiedad in this.participantes) {
      if (this.participantes.hasOwnProperty(propiedad)) {
        cell = document.createElement('td');
        textP = document.createElement('p');
        textP.innerHTML = this.participantes[propiedad];
        this.participantes[propiedad] = '';
        cell.appendChild(textP);
        row.appendChild(cell);
        tableBody.appendChild(row);
      }
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

  fechaActual(){
    let fechaActual = new Date();
    let año = fechaActual.getFullYear();
    let mes = fechaActual.getMonth() + 1; // Los meses son indexados desde 0, así que sumamos 1
    let dia = fechaActual.getDate();

    let fechaFormateada = `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
    console.log(fechaFormateada);
    return fechaFormateada;
  }
  continuar() {

    this.participePrincipal = {
      'cod_cliente': '1',
      'numero_identificacion': '123456789',
      'apellidos': 'JUAN CARLO ',
      'nombres': 'BODOQUE',
      'direccion': 'SANGOQUI',
      'telefono': '0987654321',
      'correo_electronico': 'juancharlosd@gmail.com',

    }
    this.participeSecundario = [{
      'cod_cliente': '1',
      'numero_identificacion': '17352156',
      'apellidos': 'Garcia Naverrete',
      'nombres': 'Ricky Garcia',
    }, {
      'cod_cliente': '2',
      'numero_identificacion': '18987654',
      'apellidos': 'Juan Pepe',
      'nombres': 'El pepe',
    },
    {
      'cod_cliente': '3',
      'numero_identificacion': '156123456',
      'apellidos': 'Navarrete Navarrete',
      'nombres': 'Lourdes Amada',
    }]

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
  regresar(){
    this.router.navigate(["clientes"]);
  }
}
