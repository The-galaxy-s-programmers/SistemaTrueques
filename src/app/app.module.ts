import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MenuProductosComponent } from './components/menu-productos/menu-productos.component';
import { ProductoComponent } from './components/producto/producto.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { IngresoProductoComponent } from './components/ingreso-producto/ingreso-producto.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuProductosComponent,
    ProductoComponent,
    RegistroUsuarioComponent,
    IngresoProductoComponent,
    PerfilComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
