import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FlujoDatosService } from '../Servicios/flujo-datos.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const flujoDatos = Inject(FlujoDatosService);
  const router = Inject(Router);
  if(localStorage.getItem("user")){
    return true;
  }
  router.navigate(['/']);
  return false;
};
