import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuventasComponent } from './menuventas/menuventas.component';
import { RouterModule, Routes } from '@angular/router';

import { ListacliComponent } from './clientes/listacli/listacli.component';
import { CrearcliComponent } from './clientes/crearcli/crearcli.component';
import { GuardService } from '../servicios/guard.service';


const routes : Routes = [
  { path: 'menu-ventas', component: MenuventasComponent, canActivate : [GuardService] },
  { path: 'lista-clientes', component: ListacliComponent, canActivate : [GuardService] },
  { path: 'crear-cliente', component: CrearcliComponent, canActivate : [GuardService] }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [MenuventasComponent, ListacliComponent, CrearcliComponent],
  providers: [GuardService],
})
export class VentasModule { }
