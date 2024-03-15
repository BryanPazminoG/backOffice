import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/Servicios/cliente.service';
import { CuentaService } from 'src/app/Servicios/cuenta.service';

@Component({
  selector: 'app-consulta-cuenta',
  templateUrl: './consulta-cuenta.component.html',
  styleUrls: ['./consulta-cuenta.component.css']
})
export class ConsultaCuentaComponent implements OnInit {
  clienteIdentificacion = {
    'idCliente': "",
    'tipoIdentificacion': '',
    'numeroIdentificacion': '',
    'apellidos': '', 
    'nombres': '', 
    'razonSocial': '',
    'correoElectronico': ''
  };
  cuentaIdentificacion = {
    'codCuenta': 0, 
    'numeroCuenta': '', 
    'codTipoCuenta': '', 
    'estado': '',
    'fechaCreacion': '',
  };
  listaIntervinientes = [{
    "estado": "",
    "codCuenta": 0,
    "codCliente": "",
      
  }];
  listacliente = [{ 'apellidos': '', 'nombres': '', 'razonSocial': '',  'correoElectronico': '' }];
  listaCuentas = [{ 'codCuenta': 0, 'numeroCuenta': '', 'codTipoCuenta': '', 'estado': '','fechaCreacion': ''}];

  identFirstCliente = true;
  identValidacionCliente = false;

  identFirstCuenta = true;
  identValidacionCuenta = false;

  constructor(private serviceCliente: ClienteService, private serviceCuenta: CuentaService, private router: Router) {
  }
  ngOnInit(): void {
    this.listacliente.pop();
    this.listaCuentas.pop();
  }

  getCliente() {
    if (this.clienteIdentificacion.numeroIdentificacion != "" && this.clienteIdentificacion.tipoIdentificacion != "") {
      this.listaCuentas = [{ 'codCuenta': 0, 'numeroCuenta': '', 'codTipoCuenta': '', 'estado': '','fechaCreacion': ''}];
      this.listaCuentas.pop();
      this.serviceCliente.buscarClientePorParametros(this.clienteIdentificacion.tipoIdentificacion, this.clienteIdentificacion.numeroIdentificacion).subscribe(
        (data) => {
          this.identFirstCliente = false;
          this.identValidacionCliente = true;
          if (data) {
            this.clienteIdentificacion = data;
            this.getCuentaByClienteAPI();
          } else {
            this.identValidacionCliente = false;
          }
        },
        (error) => {
          this.identValidacionCliente = false;
          console.error('Error al hacer la solicitud:', error);
        }
      );
    }
  }
  getCuenta() {
    if (this.cuentaIdentificacion.numeroCuenta != "") {
      this.listacliente = [{ 'apellidos': '', 'nombres': '', 'razonSocial': '', 'correoElectronico': '' }];
      this.listacliente.pop();
      this.serviceCuenta.getCuentaByNumeroAPI(this.cuentaIdentificacion.numeroCuenta).subscribe(
        (data) => {
          this.identFirstCuenta = false;
          this.identValidacionCuenta = true;
          if (data) {
            this.cuentaIdentificacion = data;
            this.getClienteByCuenta();
          } else {
            this.identValidacionCuenta = false;
          }
        },
        (error) => {
          this.identValidacionCuenta = false;
          console.error('Error al hacer la solicitud:', error);
        }
      );
    }
  }
  getCuentaByClienteAPI() {
    if (this.clienteIdentificacion.idCliente) {
      this.serviceCuenta.getInterByClienteAPI(this.clienteIdentificacion.idCliente).subscribe(
        (data) => {
          if (data) {
            this.listaIntervinientes = data;
            this.listaIntervinientes.forEach((interviniente) => {
              this.serviceCuenta.getCuentaByIdAPI(interviniente.codCuenta).subscribe(
                (data) => {
                  if(data){
                    this.listaCuentas.push(data);
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
    }
  }
  
  getClienteByCuenta() {
    console.log(this.cuentaIdentificacion.codCuenta);
    if(this.cuentaIdentificacion.codCuenta > 0){
      this.serviceCuenta.getInterByCuentadAPI(this.cuentaIdentificacion.codCuenta).subscribe(
        (data) => {
          if (data) {
            this.listaIntervinientes = data;
            /****************  BORRRAR ESTO *************/
            this.listacliente.push(
              { 'apellidos': 'rICKY', 'nombres': 'GARCIA', 'razonSocial': 'ESPE',  'correoElectronico': 'KIKI' }
            );
            /*********** DESCOMENTAR ESTO ************************/
            
            // this.listaIntervinientes.forEach((interviniente) => {
            //   this.serviceCliente.getClienteByIdAPI(interviniente.codCliente).subscribe(
            //     (data) => {
            //       if(data){
            //         this.listacliente.push(data);
            //       }
            //     },
            //     (error) => {
            //       console.error('Error al hacer la solicitud:', error);
            //     }
            //   );
            // });
          }
        },
        (error) => {
          console.error('Error al hacer la solicitud:', error);
        }
      );
    }
  }

  restDatosUsuario() {
    this.clienteIdentificacion.idCliente = '';
    this.clienteIdentificacion.nombres = '';
    this.clienteIdentificacion.razonSocial = '';
    this.clienteIdentificacion.correoElectronico = '';
    this.identFirstCliente = true;
    this.identValidacionCliente = false;
    this.listaIntervinientes = [{
      "estado": "",
      "codCuenta": 0,
      "codCliente": "",
    }];
    this.listaCuentas = [{ 'codCuenta': 0, 'numeroCuenta': '', 'codTipoCuenta': '', 'estado': '','fechaCreacion': ''}];
    this.listaCuentas.pop();
  }
  restDatosCuenta() {
    this.cuentaIdentificacion.codCuenta = 0;
    this.cuentaIdentificacion.codTipoCuenta = '';
    this.cuentaIdentificacion.estado = '';
    this.cuentaIdentificacion.fechaCreacion = '';

    this.identFirstCuenta = true;
    this.identValidacionCuenta = false;
    this.listaIntervinientes = [{
      "estado": "",
      "codCuenta": 0,
      "codCliente": "",
    }];
    this.listacliente = [{ 'apellidos': '', 'nombres': '', 'razonSocial': '', 'correoElectronico': '' }];
    this.listacliente.pop();
  }
  regresar() {
    this.router.navigate(["cuentas"]);
  }
}
