import { NgModule } from "@angular/core";
import { ActivoService } from "./services/activo.service";
import { ListadoPageComponent } from './pages/listado-page/listado-page.component';
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import { provideHttpClient} from '@angular/common/http';

@NgModule ({
  providers: [
    ActivoService,
    provideHttpClient()
  ],
  imports: [
    CurrencyPipe,
    DatePipe,
    NgForOf,
  ],
  exports: [
    ListadoPageComponent
  ],
  declarations: [
    ListadoPageComponent
  ]
})

export class ActivosModule {

}
