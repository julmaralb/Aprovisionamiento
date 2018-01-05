import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination'


import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ListapreComponent } from './presupuestos/listapre/listapre.component';
import { CrearpreComponent } from './presupuestos/crearpre/crearpre.component';
import { VerpreComponent } from './presupuestos/verpre/verpre.component';
import { EditpreComponent } from './presupuestos/editpre/editpre.component';
import { CrearproComponent } from './proveedores/crearpro/crearpro.component';
import { EditproComponent } from './proveedores/editpro/editpro.component';
import { ListaproComponent } from './proveedores/listapro/listapro.component';
import { VerproComponent } from './proveedores/verpro/verpro.component';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { LoginComponent } from './autenticacion/login/login.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { GuardService } from './servicios/guard.service';
import { BuscarproComponent } from './proveedores/buscarpro/buscarpro.component';
import { CrearfraComponent } from './facturas/crearfra/crearfra.component';
import { ListafraComponent } from './facturas/listafra/listafra.component';
import { VerfraComponent } from './facturas/verfra/verfra.component';
import { EditfraComponent } from './facturas/editfra/editfra.component';
import { EurosPipe } from './pipes/euros.pipe';

import { VentasModule } from './ventas/ventas.module';
import { MenucomprasComponent } from './menucompras/menucompras.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'lista-presupuestos', component: ListapreComponent, canActivate : [GuardService] },
  { path: 'crear-presupuesto', component: CrearpreComponent, canActivate : [GuardService] },
  { path: 'ver-presupuesto/:id', component: VerpreComponent, canActivate : [GuardService] },
  { path: 'editar-presupuesto/:id', component: EditpreComponent, canActivate : [GuardService] },
  { path: 'lista-proveedores', component: ListaproComponent, canActivate : [GuardService] },
  { path: 'crear-proveedor', component: CrearproComponent, canActivate : [GuardService] },
  { path: 'ver-proveedor/:id', component: VerproComponent, canActivate : [GuardService] },
  { path: 'editar-proveedor/:id', component: EditproComponent, canActivate : [GuardService] },
  { path: 'buscar-proveedor', component: BuscarproComponent, canActivate : [GuardService] },
  { path: 'lista-facturas', component: ListafraComponent, canActivate : [GuardService] },
  { path: 'crear-factura', component: CrearfraComponent, canActivate : [GuardService] },
  { path: 'ver-factura/:id', component: VerfraComponent, canActivate : [GuardService] },
  { path: 'menu-compras', component: MenucomprasComponent, canActivate : [GuardService] },
  { path: 'editar-factura/:id', component: EditfraComponent,  },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: InicioComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ListapreComponent,
    CrearpreComponent,
    VerpreComponent,
    EditpreComponent,
    CrearproComponent,
    EditproComponent,
    ListaproComponent,
    VerproComponent,
    RegistroComponent,
    LoginComponent,
    BuscarproComponent,
    CrearfraComponent,
    ListafraComponent,
    VerfraComponent,
    EditfraComponent,
    EurosPipe,
    MenucomprasComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2OrderModule,
    NgxPaginationModule,
    VentasModule
  ],
  providers: [AutenticacionService, GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
