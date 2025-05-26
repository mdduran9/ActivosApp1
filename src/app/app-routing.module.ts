import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'activos',
    loadChildren: () => import('./features/activos/activos.module').then(m => m.ActivosModule)
  },
  { path: '', redirectTo: '/activos/listar', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
