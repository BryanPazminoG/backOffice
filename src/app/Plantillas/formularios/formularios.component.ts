import { Component, OnInit } from '@angular/core';
import { JuegoService } from 'src/app/Servicios/juego.service';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit {

  juegosList: any[] = [];

  categoria:any[] = [];

  
  constructor(private juegoService: JuegoService) { }

  ngOnInit(): void {
    this.juegoService.getApi().subscribe(response => {      
      this.juegosList = response
    });
  }

  search(event: any)
  {
    const platform = event.target.value;
    this.juegoService.getJuego(platform).subscribe((data:any) => {
      this.categoria = data
      console.log(platform)
    });
  }

}
