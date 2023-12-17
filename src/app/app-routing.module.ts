import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Paginas/error/error.component';
import { UsuariosComponent } from './Paginas/backOffice/usuarios/usuarios.component';
import { ClientesComponent } from './Paginas/backOffice/clientes/inicio/clientes.component';
import { CuentasComponent } from './Paginas/backOffice/cuentas/cuentas.component';
import { CrearComponent } from './Paginas/backOffice/clientes/crear/crear.component';
import { PersonaComponent } from './Paginas/backOffice/clientes/persona/persona.component';
import { ConsultaComponent } from './Paginas/backOffice/clientes/consulta/consulta.component';
import { EditarComponent } from './Paginas/backOffice/clientes/editar/editar.component';
import { EstadoComponent } from './Paginas/backOffice/clientes/estado/estado.component';
import { LoginComponent } from './Paginas/login/login.component';


const routes: Routes = [
  { path:'' , component: LoginComponent, pathMatch: 'full' },
  { path:'login' , component: LoginComponent, pathMatch: 'full' },
  { path:'usuarios' , component : UsuariosComponent},
  { path:'clientes', component: ClientesComponent},
  { path: 'clientes/crear', component: CrearComponent }, 
  { path: 'clientes/crear/persona', component: PersonaComponent }, 
  { path: 'clientes/consultas', component: ConsultaComponent }, 
  { path: 'clientes/editar', component: EditarComponent }, 
  { path: 'clientes/estado', component: EstadoComponent },
  { path:'cuentas', component: CuentasComponent}, 
  { path:'**' , component : ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
