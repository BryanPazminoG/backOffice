import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './Bloques/backOffice/navbar/navbar.component';
import { SideBarComponent} from './Bloques/backOffice/sidebar/sidebar.component';


import { ErrorComponent } from './Paginas/error/error.component';
import { ClientesComponent } from './Paginas/backOffice/clientes/clientes.component';
import { UsuariosComponent } from './Paginas/backOffice/usuarios/usuarios.component';
import { CuentasComponent } from './Paginas/backOffice/cuentas/cuentas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ErrorComponent,
    UsuariosComponent,
    SideBarComponent,
    ClientesComponent,
    CuentasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
