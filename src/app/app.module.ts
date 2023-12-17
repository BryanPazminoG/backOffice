import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Bloques/navbar/navbar.component';
import { MenuComponent } from './Componentes/menu/menu.component';
import { ComponentesComponent } from './Plantillas/componentes/componentes.component';
import { FormulariosComponent } from './Plantillas/formularios/formularios.component';
import { RutasComponent } from './Plantillas/rutas/rutas.component';
import { ServiciosComponent } from './Plantillas/servicios/servicios.component';
import { ErrorComponent } from './Plantillas/error/error.component';
import { HomeComponent } from './Plantillas/home/home.component';
import { FooterComponent } from './Bloques/footer/footer.component';
import { HeaderComponent } from './Bloques/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    ComponentesComponent,
    FormulariosComponent,
    RutasComponent,
    ServiciosComponent,
    ErrorComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent
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
