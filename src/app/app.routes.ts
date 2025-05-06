import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', loadChildren: () => import('../app/components/inicio/inicio.routes').then(m => m.INICIO_ROUTES) }
    ]
  }
]
