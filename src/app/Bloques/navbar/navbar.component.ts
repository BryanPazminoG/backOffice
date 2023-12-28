import { Component, OnInit } from '@angular/core';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario = {
    nombre: "",
    usuario: "",
  }

  constructor( private flujoDatosService: FlujoDatosService) { }

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(){
    this.usuario = <any> this.flujoDatosService.getUsuarioLogin();
  }
}
