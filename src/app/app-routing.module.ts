import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Plantillas/error/error.component';
import { ComponentesComponent } from './Plantillas/componentes/componentes.component';
import { FormulariosComponent } from './Plantillas/formularios/formularios.component';
import { RutasComponent } from './Plantillas/rutas/rutas.component';
import { ServiciosComponent } from './Plantillas/servicios/servicios.component';
import { HomeComponent } from './Plantillas/home/home.component';

const routes: Routes = [
  { path:'' , component: HomeComponent, pathMatch: 'full' },
  { path:'dashboard' , component : ComponentesComponent},
  { path:'formularios' , component : FormulariosComponent},
  { path:'rutas' , component : RutasComponent},
  { path:'servicios' , component : ServiciosComponent},
  { path:'home' , component : HomeComponent},
  { path:'**' , component : ErrorComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
