import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { AutenticacionService } from './autenticacion.service';

@Injectable()
export class GuardService implements CanActivate {

  constructor(private authService: AutenticacionService) { }

  canActivate(route : ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuth();
  }

}
