import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  activeLink: string = ''; // Variable para almacenar el enlace activo

  setActiveLink(link: string): void {
    this.activeLink = link; // Función para establecer el enlace activo
  }
}
