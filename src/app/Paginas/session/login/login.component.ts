import { Component, OnInit } from '@angular/core';
import { SegUsuarioService } from 'src/app/Servicios/seg-usuario.service';
import { Router } from '@angular/router';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credenciales = {
    usuario: '',
    clave: '',
  };
  primeraVisita = true;
  accesoValidacion = false;

  constructor(
    private segUsuarioService: SegUsuarioService,
    private router: Router,
    private flujoDatosService: FlujoDatosService
  ) {}

  ngOnInit(): void {}

  loginUser() {
    this.segUsuarioService
      .loguearUsuarioAPI(this.credenciales.usuario, this.credenciales.clave)
      .subscribe(
        (data) => {
          this.router.navigate(['/clientes']);
          this.accesoValidacion = true;
          this.flujoDatosService.setUsuarioLogin(data)
        },
        (error) => {
          console.error('Error al hacer la solicitud:', error);
        }
      );
    this.primeraVisita = false;
    this.accesoValidacion = false;
    this.router.navigate(['/clientes']);
  }
}
