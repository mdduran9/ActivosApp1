import { Component, OnInit } from '@angular/core';
import { ActivoService } from '../../services/activo.service';

@Component({
  selector: 'app-listado-page',
  standalone: false,
  templateUrl: './listado-page.component.html',
  styleUrl: './listado-page.component.css'
})

export class ListadoPageComponent implements OnInit {
  listado:Array<any> = []
  constructor (private activoService:ActivoService){}
  ngOnInit(): void {
    this.activoService.getActivos().subscribe({
      next: (data) => {
        this.listado = data;
        
      },
      error: (err) => {
       
      }
    });
  }
  

}

