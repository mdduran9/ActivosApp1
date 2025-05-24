import { NgModule } from "@angular/core";
import { ActivoService } from "./services/activo.service";
import { ListadoPageComponent } from './pages/listado-page/listado-page.component';

@NgModule ({
    providers:[
        ActivoService
    ],
    declarations: [
      ListadoPageComponent
    ]
})

export class ActivosModule {

}