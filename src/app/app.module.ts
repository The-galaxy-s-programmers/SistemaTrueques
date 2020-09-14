import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common'

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

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ReportComponent } from './components/report/report.component';

// Paste in your credentials that you saved earlier
var firebaseConfig = {
  apiKey: "AIzaSyDZgjRnAcR2kXCNMjvYEpgx8t0k1dHn94Y",
  authDomain: "sistematrueques.firebaseapp.com",
  databaseURL: "https://sistematrueques.firebaseio.com",
  projectId: "sistematrueques",
  storageBucket: "sistematrueques.appspot.com",
  messagingSenderId: "1088908507063",
  appId: "1:1088908507063:web:0beaeb1693f7d6b8e09a32",
  measurementId: "G-QT1CH51CDH"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuProductosComponent,
    ProductoComponent,
    RegistroUsuarioComponent,
    IngresoProductoComponent,
    PerfilComponent,
    ErrorComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
