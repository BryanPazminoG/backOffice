import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Paginas/error/error.component';
import { UsuariosComponent } from './Paginas/backOffice/usuarios/usuarios.component';
import { ClientesComponent } from './Paginas/backOffice/clientes/clientes.component';
import { CuentasComponent } from './Paginas/backOffice/cuentas/cuentas.component';

const routes: Routes = [
  //{ path:'' , component: HomeComponent, pathMatch: 'full' },
  { path:'usuarios' , component : UsuariosComponent},
  { path:'clientes', component: ClientesComponent}, 
  { path:'cuentas', component: CuentasComponent}, 
  { path:'**' , component : ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
