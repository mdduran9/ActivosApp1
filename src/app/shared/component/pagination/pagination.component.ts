import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Activo} from "../../../features/activos/models/user.model";

@Component({
    selector: 'app-pagination',
    standalone: false,
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.css'
})
export class PaginationComponent {

    @Input() paginaActual: number = 1;
    @Input() limite: number = 10;
    @Input() total: number = 0
    @Output() paginaCambiada = new EventEmitter<number>();


    cambiarPagina(nuevaPagina: number) {
        this.paginaActual = nuevaPagina;
        this.paginaCambiada.emit(nuevaPagina);
    }

    get paginas(): number[] {
        const totalPaginas = Math.ceil(this.total / this.limite);
        return Array.from({length: totalPaginas}, (_, i) => i + 1);
    }

    get ultimaPagina(): number {
        return Math.ceil(this.total / this.limite) || 1;
    }

}
