import { Component, OnInit } from '@angular/core';
import { SegUsuarioService } from 'src/app/Servicios/seg-usuario.service';
import { Router } from '@angular/router';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  credenciales = {
    "usuario": "",
    "clave": ""
  }
  primeraVisita = true;
  accesoValidacion = false;

  constructor(private segUsuarioService: SegUsuarioService, private router: Router, private flujoDatos: FlujoDatosService){}

  ngOnInit(): void {
    localStorage.clear();
  }

  loginUser(){
    if(this.credenciales.usuario != '' && this.credenciales.clave  != '')
    this.primeraVisita = false;
    this.accesoValidacion = true;

    console.log(this.credenciales);

    this.segUsuarioService.validarUsuarioLogin(this.credenciales).subscribe(
      (data) => {
        if(data){
          this.flujoDatos.setValidacionLogin(data.usuario);
          this.router.navigate(["/clientes"]);
        }else{
          this.accesoValidacion = false;
        }

      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
        this.accesoValidacion = false;
      }
    );
  }
}
