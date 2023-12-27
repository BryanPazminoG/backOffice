import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mensaje(){
    Swal.fire({
      title: 'Regresar',
      text: 'Estas Seguro que queires regresar?',
      icon: 'question',
      confirmButtonText: 'Aceptar'
    })
  }

}
