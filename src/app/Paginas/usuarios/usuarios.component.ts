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
          this.rolesUsuario = data;
        }
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );

  }

  

  personalBanco() {
    const codRolSeleccionado = this.accesoPBRol.pk.codRol;
    const codRolSeleccionadoEntero = typeof codRolSeleccionado === 'string' ? parseInt(codRolSeleccionado) : codRolSeleccionado;
    const rolesConCodRolSeleccionado = this.rolesUsuario.filter(rol => rol.codRol === codRolSeleccionadoEntero);
    const nombresRoles = rolesConCodRolSeleccionado.map(rol => rol.nombreRol);
    
    
    const fecha = this.fechaActual();
    this.personalBancario.acceso =  String(codRolSeleccionado);
    this.personalBancario.fechaUltimaModificacion = "" + fecha;
    const nombreRol = nombresRoles.length > 0 ? nombresRoles[0] : null;
    
    const nombres = this.accesoPBRol.nombre;
    
    const datosUsuario = {
      usuario: this.personalBancario.usuario,
      clave: this.personalBancario.clave,
      acceso: nombreRol,
      fechaCreacion: "" + fecha,
      fechaUltimaModificacion: "" + fecha
    }

    this.servicioRoles.crearPersonalBancario(datosUsuario).subscribe(
      (data) => {
        if (data) {
          const relacionPersonalRol = {
            codRol: codRolSeleccionado,
            codPerBan: data.codPersonalBancario,
            nombre: nombres,
            estado: "ACT",
            intentosError: 0,
            fechaUltimaModificacion: "" + fecha
          }
          this.accesoPB(relacionPersonalRol);
        }
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }

  accesoPB(datosAcceso: any) {
    this.servicioRoles.crearAccesoPB(datosAcceso).subscribe(
      (data) => {
        if (data == null) {
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
