import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuProductosComponent } from './components/menu-productos/menu-productos.component';
import { ProductoComponent } from './components/producto/producto.component';
import { IngresoProductoComponent } from './components/ingreso-producto/ingreso-producto.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ErrorComponent } from './components/error/error.component';
import {ReportComponent} from './components/report/report.component';
import {ChatProductoComponent } from './components/chat-producto/chat-producto.component'
import { UnsuscribeComponent } from './components/unsuscribe/unsuscribe.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"MenuProductos", component:MenuProductosComponent},
  {path:"Producto", component:ProductoComponent},
  {path:"RegistroUsuario", component:RegistroUsuarioComponent},
  {path:"IngresoProducto", component:IngresoProductoComponent},
  {path:"Perfil", component:PerfilComponent},
  {path:"Error", component:ErrorComponent},
  {path:"Report", component:ReportComponent},
  {path:"Chat", component:ChatProductoComponent},
  {path:"DesSub",component:UnsuscribeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
