import { NgModule } from "@angular/core";
import { ActivoService } from "./services/activo.service";
import { ListadoPageComponent } from './pages/listado-page/listado-page.component';
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import { provideHttpClient} from '@angular/common/http';
import {PaginationComponent} from '../../shared/component/pagination/pagination.component';
import {MatIcon} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AreasService} from '../areas/services/areas.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {ActivoFormComponent} from './pages/form-page/activo-form.component';
import {
  ListadoMovimientoPageComponent
} from '../movements/pages/listado-movimiento-page/listado-movimiento-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'nuevo', pathMatch: 'full' },
  { path: 'nuevo', component: ActivoFormComponent },
  { path: 'editar/:id', component: ActivoFormComponent },
  { path: 'listar', component: ListadoPageComponent },
  { path: 'movimientos', component: ListadoMovimientoPageComponent }


];

@NgModule ({
  providers: [
    ActivoService,
    AreasService,
    provideHttpClient()
  ],
  imports: [
    CurrencyPipe,
    DatePipe,
    NgForOf,
    MatIcon,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,

  ],
  exports: [
    ListadoPageComponent,
    PaginationComponent,
  ],
  declarations: [
    ListadoPageComponent,
    PaginationComponent,
    ActivoFormComponent,
  ]
})

export class ActivosModule {

}
