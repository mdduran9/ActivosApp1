import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ActivosModule} from './features/activos/activos.module';
import { MatIconModule } from '@angular/material/icon';
import { ListadoMovimientoPageComponent } from './features/movements/pages/listado-movimiento-page/listado-movimiento-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ListadoMovimientoPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ActivosModule,
    MatIconModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
