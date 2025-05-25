import { NgModule } from "@angular/core";
import { ActivoService } from "./services/activo.service";
import { ListadoPageComponent } from './pages/listado-page/listado-page.component';
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import { provideHttpClient} from '@angular/common/http';
import {PaginationComponent} from '../../shared/component/pagination/pagination.component';
import {MatIcon} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormPageComponent } from './pages/form-page/form-page.component';
import {AreasService} from '../areas/services/areas.service';


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
    FormsModule
  ],
  exports: [
    ListadoPageComponent
  ],
  declarations: [
    ListadoPageComponent,
    PaginationComponent,
    FormPageComponent
  ]
})

export class ActivosModule {

}
