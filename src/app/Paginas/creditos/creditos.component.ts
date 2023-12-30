import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/Servicios/cliente.service';
import { CreditoService } from 'src/app/Servicios/credito.service';
import { CuentaService } from 'src/app/Servicios/cuenta.service';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.css']
})
export class CreditosComponent implements OnInit {

  participantes = {
    'cod_cliente': 0,
    'numeroCuenta': '',
    'tipo_identificacion': '',
    'numero_identificacion': '',
    'apellidos': '',
    'nombres': '',
  };
  listaTipoCredito = [{
    'codTipoCredito': 0,
    'nombre': '',
  }];
  tipoCredito = {
    'codTipoCredito': 0,
    'codTasaInteres': '',
    'nombre': '',
    'plazoMinimo': 0,
    'plazoMaximo': 0,
    'montoMinimo': 0,
    'montoMaximo': 0,
  };

  participePrincipal = {
    'cod_cliente': 0,
    'numeroCuenta': '',
    'tipo_identificacion': '',
    'numero_identificacion': '',
    'apellidos': '',
    'nombres': '',
    'direccion': '',
    'telefono': '',
    'correo_electronico': '',
  };
  participeSecundario = [{}];
  tasaInteres = {
    'codTasaInteres': '',
    'tipoTasaInteres': '',
    'nombre': '',
    'tasaMinima': 0,
    'tasaMaxima': 0,
  };
  credito = {
    'codTipoCredito': 0,
    'codCliente': 0,
    'fecha_creacion': '',
    'tasaInteres': 0,
    'monto': 0,
    'plazo': 0,
  };
  cuentasClienteP = [{
    'codCuenta': 0,
    'codCliente': 0,
    'numeroCuenta': '',
  }];
  cuentasClienteS = [{
    'codCuenta': 0,
    'codCliente': 0,
    'numeroCuenta': '',
  }];
  cuentasParticipes = [{}];

  identPFirst = true;
  identPValidacion = false;
  identSFirst = true;
  identSValidacion = false;
  existencia = false;

  mensajeIdentificacion:string = "Identificacion Incorrecta";
  mensajeIdentificacionDos:string = "Identificacion Incorrecta";
  mensajeValidacion:string = "El cliente y existe";

  constructor(
    private router: Router,
    private serviceCredito: CreditoService,
    private serviceCliente: ClienteService,
    private serviceCuenta: CuentaService,
    private flujoDatosService: FlujoDatosService
  ) { }

  ngOnInit(): void {
    this.getAllTipoCredito();
  }

  getClienteP() {
    this.participePrincipal.cod_cliente = 0;
    this.participePrincipal.apellidos = '';
    this.participePrincipal.nombres = '';
    this.participePrincipal.direccion = '';
    this.participePrincipal.telefono = '';
    this.participePrincipal.correo_electronico = '';

    this.serviceCliente.buscarClientePorParametros(this.participePrincipal.tipo_identificacion, this.participePrincipal.numero_identificacion).subscribe(
      (data) => {
        this.identPFirst = false;
        this.identPValidacion = true;
        if (data) {
          this.participePrincipal = {
            'cod_cliente': data.codigo,
            'numeroCuenta': '',
            'tipo_identificacion': data.tipoIdentificacion,
            'numero_identificacion': data.numeroIdentificacion,
            'apellidos': data.apellidos,
            'nombres': data.nombres,
            'direccion': data.direccion,
            'telefono': data.telefono,
            'correo_electronico': data.correoElectronico,
          }
          this.getCuentaByClienteAPI("PRI");
        } else {
          this.mensajeIdentificacion = "Identificacion Incorrecta";
          this.identPValidacion = false;
        }
      },
      (error) => {
        this.identPValidacion = false;
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }
  getClienteS() {
    this.participantes['cod_cliente'] = 0;
    this.participantes['apellidos'] = '';
    this.participantes['nombres'] = '';

    this.serviceCliente.buscarClientePorParametros(this.participantes['tipo_identificacion'], this.participantes['numero_identificacion']).subscribe(
      (data) => {
        this.identSFirst = false;
        this.identSValidacion = true;
        if (data) {
          this.participantes['cod_cliente'] = data.codigo;
          this.participantes['tipo_identificacion'] = data.tipoIdentificacion;
          this.participantes['numero_identificacion'] = data.numeroIdentificacion;
          this.participantes['apellidos'] = data.apellidos;
          this.participantes['nombres'] = data.nombres;
          this.getCuentaByClienteAPI("SEC");
        } else {
          this.mensajeIdentificacionDos = "Identificacion Incorrecta";
          this.identSValidacion = false;
        }
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
      let numCuenta = this.participantes.numeroCuenta;
      if (!objetoEncontrado && this.participePrincipal.numero_identificacion !== this.participantes.numero_identificacion && numCuenta != "") {
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
        let cell4 = document.createElement('td');
        let textP4 = document.createElement('p');
        let cell5 = document.createElement('td');
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

        textP3.innerHTML = this.participantes.numeroCuenta;
        cell3.appendChild(textP3);
        row.appendChild(cell3);

        textP4.innerHTML = this.participantes.apellidos + " " + this.participantes.nombres;
        cell4.appendChild(textP4);
        row.appendChild(cell4);

        var boton = document.createElement("button");
        boton.type = "button";
        boton.className = "btn btn-dark w-100";

        boton.onclick  = () => {
          this.EliminarFila(boton);
      };
        var icono = document.createElement("i");
        icono.className = "bi bi-x-lg";

        boton.appendChild(icono);
        cell5.appendChild(boton);
        row.appendChild(cell5);
        tableBody.appendChild(row);

        this.participantes['cod_cliente'] = 0;
        this.participantes['tipo_identificacion'] = '';
        this.participantes['numero_identificacion'] = '';
        this.participantes['apellidos'] = '';
        this.participantes['nombres'] = '';
        this.participantes['numeroCuenta'] = '';
        this.cuentasParticipes.push({...this.cuentasClienteS});
        this.cuentasClienteS = 
        [{
          'codCuenta': 0,
          'codCliente': 0,
          'numeroCuenta': '',
        }];

      } else {
        if(numCuenta == "") this.mensajeValidacion = "Seleccione una cuenta";
        else this.mensajeValidacion = "El cliente y existe";

        this.existencia = true;
      }
    }
  }

  EliminarFila(event: any){
    var fila = event.closest('tr');
    if(fila){
      var cuartaColumnaElement = fila.querySelector('td:nth-child(3)');
      if (cuartaColumnaElement !== null) {
        var cuartaColumna = cuartaColumnaElement.textContent;

        let objetoLista = this.participeSecundario.findIndex(objeto => {
          return JSON.stringify(objeto).includes(cuartaColumna);
        });
        if (objetoLista !== -1) {
            this.participeSecundario.splice(objetoLista, 1);
        }
      }

    }
    fila.remove();
  }

  getAllTipoCredito() {
    this.serviceCredito.getAllTipoCreAPI().subscribe(
      (data) => {
        if (data) {
          this.listaTipoCredito = data;
        }
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }
  getIdTipoCredito(event: any) {
    const valorSeleccionado = event.target.value;

    if (valorSeleccionado != 0) {
      this.serviceCredito.getByIdTipoCreAPI(valorSeleccionado).subscribe(
        (data) => {
          this.tipoCredito = data;
          this.getByIdTasaInt();
        },
        (error) => {
          console.error('Error al hacer la solicitud:', error);
        }
      );
    }
  }
  getByIdTasaInt() {
    const valorSeleccionado = this.tipoCredito.codTasaInteres;

    if (valorSeleccionado != "") {
      this.serviceCredito.getByIdTasaIntAPI(valorSeleccionado).subscribe(
        (data) => {
          if(data){
            this.tasaInteres = data;
          }
        },
        (error) => {
          console.error('Error al hacer la solicitud:', error);
        }
      );
    }
  }
  getCuentaByClienteAPI(tipoParticipante: string) {
    let idCliente = 0;
    if(tipoParticipante == "PRI") idCliente = this.participePrincipal.cod_cliente;
    else idCliente = this.participantes.cod_cliente;
    if (idCliente != 0) {
      this.serviceCuenta.getCuentaByClienteAPI(idCliente).subscribe(
        (data) => {
          console.log(data);
          if(data){
            console.log("SI");
            if(tipoParticipante == "PRI"){
              this.cuentasClienteP = data;
              this.identPValidacion = true;
            }else{
              this.cuentasClienteS = data;
              this.identSValidacion = true;
            }
          }
        },
        (error) => {
          console.error('Error al hacer la solicitud:', error);
          if(tipoParticipante == "PRI"){
            this.restValorClienteP();
            this.mensajeIdentificacion = "El cliente no tiene una cuenta en el banco"
            this.identPValidacion = false;
          }else if(tipoParticipante == "SEC"){
            this.restValorClienteS();
            this.mensajeIdentificacionDos = "El cliente no tiene una cuenta en el banco"
            this.identSValidacion = false;
          }
        }
      );
    }
  }

  validacionesEnteros(event: any, min: number, max: number) {
    let valor = Math.round(event.target.value);
    if (valor < min) event.target.value = min;
    else if (valor > max) event.target.value = max;
    else event.target.value = valor;
  }
  calcularTasaInteres(){
    let monto = this.credito.monto;
    let plazo = this.credito.plazo;

    if(monto > 0 && plazo > 0){
      this.serviceCredito.getCalculoTasaIntAPI(this.tasaInteres.codTasaInteres, monto, plazo).subscribe(
        (data) => {
          if(data){
            this.credito.tasaInteres = data;
          }
        },
        (error) => {
          console.error('Error al hacer la solicitud:', error);
        }
      );
    }
  }
  fechaActual() {
    let fechaActual = new Date();
    let año = fechaActual.getFullYear();
    let mes = fechaActual.getMonth() + 1; // Los meses son indexados desde 0, así que sumamos 1
    let dia = fechaActual.getDate();

    let fechaFormateada = `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
    return fechaFormateada;
  }
  restValorClienteP(){
    this.participePrincipal.cod_cliente = 0;
    this.participePrincipal.numeroCuenta = "";
    //this.participePrincipal.numero_identificacion = "";
    this.participePrincipal.apellidos = "";
    this.participePrincipal.nombres = "";
    this.participePrincipal.direccion = "";
    this.participePrincipal.telefono = "";
    this.participePrincipal.correo_electronico = "";
    this.cuentasClienteP = [{
      'codCuenta': 0,
      'codCliente': 0,
      'numeroCuenta': '',
    }];
  }
  restValorClienteS(){
    this.participantes.cod_cliente = 0;
    this.participantes.numeroCuenta = "";
    //this.participantes.numero_identificacion = "";
    this.participantes.apellidos = "";
    this.participantes.nombres = "";
    this.cuentasClienteS = [{
      'codCuenta': 0,
      'codCliente': 0,
      'numeroCuenta': '',
    }];
  }
  continuar() {    
    if(this.participePrincipal.apellidos != "" && this.credito.monto > 0 && this.credito.plazo > 0 && this.participePrincipal.numeroCuenta != ""){
      this.credito.fecha_creacion = this.fechaActual();
      this.credito.codTipoCredito = this.tipoCredito.codTipoCredito;
      this.credito.codCliente = this.participePrincipal.cod_cliente;
      this.flujoDatosService.setParticipePrincipal(this.participePrincipal);
      this.participeSecundario.splice(0,1);
      this.flujoDatosService.setParticipeSecundario(this.participeSecundario);
      this.flujoDatosService.setCredito(this.credito);
  
      this.router.navigate(["creditos/amortizacion"]);
    }else{
      Swal.fire({
        icon: "error",
        title: "Completar los datos",
        text: "Todos los campos obligatorios deben ser llenados",
        showConfirmButton: false,
        timer: 2500
      });
    }

  }
  regresar() {
    this.router.navigate(["clientes"]);
  }
}
