import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMovimientoPageComponent } from './listado-movimiento-page.component';

describe('ListadoMovimientoPageComponent', () => {
  let component: ListadoMovimientoPageComponent;
  let fixture: ComponentFixture<ListadoMovimientoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoMovimientoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoMovimientoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
