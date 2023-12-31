import { Component } from '@angular/core';
import { ClienteService } from 'src/app/Servicios/cliente.service';
import { CuentaService } from 'src/app/Servicios/cuenta.service';

@Component({
  selector: 'app-consulta-cuenta',
  templateUrl: './consulta-cuenta.component.html',
  styleUrls: ['./consulta-cuenta.component.css']
})
export class ConsultaCuentaComponent {
  clienteIdentificacion = {
    'tipoIdentificacion': '',
    'numeroIdentificacion': '',
    'codigo': 0,
  };
  cliente = { 'apellidos': '', 'nombres': '', 'correoElectronico': '' };
  listaCuentas = [{ 'numeroCuenta': '' }];
  identFirst = true;
  identValidacion = false;

  constructor(private serviceCliente: ClienteService, private serviceCuenta: CuentaService) {
  }

  getCliente() {
    this.serviceCliente.buscarClientePorParametros(this.clienteIdentificacion.tipoIdentificacion, this.clienteIdentificacion.numeroIdentificacion).subscribe(
      (data) => {
        this.identFirst = false;
        this.identValidacion = true;
        if (data) {
          this.cliente = data;
          this.clienteIdentificacion.codigo = data.codigo;
          this.getCuentaByClienteAPI();
        } else {
          this.identValidacion = false;
        }
      },
      (error) => {
        this.identValidacion = false;
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }
  getCuentaByClienteAPI() {
    this.serviceCuenta.getCuentaByClienteAPI(this.clienteIdentificacion.codigo).subscribe(
      (data) => {
        if (data) {
          this.listaCuentas = data;
        }
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }
  restDatos() {
    this.clienteIdentificacion.codigo = 0;
    this.cliente = { 'apellidos': '', 'nombres': '', 'correoElectronico': '' };
    this.listaCuentas = [{ 'numeroCuenta': '' }];
  }
}
