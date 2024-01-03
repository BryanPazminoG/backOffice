import { Component, OnInit } from '@angular/core';
import { SegUsuarioService } from 'src/app/Servicios/seg-usuario.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  rolesUsuario = [{
    "codRol": 0,
    "nombreRol": "",
    "responsable": "",
    "fechaCreacion": "",
    "fechaUltimaModificacion": "",
  }]

  personalBancario = {

    "usuario": "",
    "clave": "",
    "acceso": "",
    "fechaCreacion": "",
    "fechaUltimaModificacion": "",
  }

  accesoPBRol = {
    "nombre": "",
    "estado": "",
    "intentosError": 0,
    "fechaCreacion": "",
    "fechaUltimaModificacion": "",
    "pk": {
      "codRol":0,
      "codPerBan":0
    }
  }
  idModulos = {
    "codPersonalBancario": 0,
  }

  constructor(private servicioRoles: SegUsuarioService) { }

  ngOnInit(): void {
    this.roles()
  }

  mensaje() {
    Swal.fire({
      title: 'Regresar',
      text: 'Estas Seguro que queires regresar?',
      icon: 'question',
      confirmButtonText: 'Aceptar'
    })
  }

  mensajeAprobado() {
    Swal.fire({
      title: 'Creacion de Usuario',
      text: 'Se ha creado exitosamente el usuario: '+this.accesoPBRol.nombre,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    })
  }

  resetDatos() {
    this.accesoPBRol = {
      nombre: "",
      estado: "",
      intentosError: 0,
      fechaCreacion: "",
      fechaUltimaModificacion: "",
      pk: {
        codRol: 0,
        codPerBan: 0
      }
    };

    this.personalBancario = {
      usuario: "",
      clave: "",
      acceso: "",
      fechaCreacion: "",
      fechaUltimaModificacion: ""
    };
  }

  fechaActual() {
    const fechaActual = new Date();
    const year = fechaActual.getFullYear().toString();
    const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); 
    const day = fechaActual.getDate().toString().padStart(2, '0');
    const hours = fechaActual.getHours().toString().padStart(2, '0');
    const minutes = fechaActual.getMinutes().toString().padStart(2, '0');
    const seconds = fechaActual.getSeconds().toString().padStart(2, '0');
    const fechaFormateada = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000+00:00`;
    return fechaFormateada;
  }

  roles() {
    this.servicioRoles.buscarRol().subscribe(
      (data) => {
        if (data) {
          console.log(data);
          this.rolesUsuario = data;
        }
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );

  }

  personalBanco() {
    const fecha = this.fechaActual();
    this.personalBancario.acceso = "1";
    this.personalBancario.fechaCreacion = "" + fecha;
    this.personalBancario.fechaUltimaModificacion = "" + fecha;
    console.log(this.personalBancario);
    this.servicioRoles.crearPersonalBancario(this.personalBancario).subscribe(
      (data) => {
        if (data) {
          this.accesoPBRol.pk.codPerBan = data.codPersonalBancario;
          this.personalBancario = data;
          this.accesoPB();
        }
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }

  accesoPB() {
    const fecha = this.fechaActual();
    this.accesoPBRol.estado = "ACT";
    this.accesoPBRol.fechaCreacion = ""+fecha;
    this.accesoPBRol.fechaUltimaModificacion=""+fecha;
    console.log(this.accesoPBRol);
    this.servicioRoles.crearAccesoPB(this.accesoPBRol).subscribe(
      (data) => {
        if (data) {
          this.mensajeAprobado();
          this.resetDatos();
          
        }
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }

}
