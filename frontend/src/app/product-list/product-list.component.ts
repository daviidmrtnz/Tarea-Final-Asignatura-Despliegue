import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  standalone: true,
  template: `
    <div style="text-align:center; margin-top: 50px; font-family: sans-serif;">
      <h1 style="color: #1976d2;">Practica Final de Despligue</h1>
      <h4> Hecho por David Martínez </h4>
      
      <button (click)="loadProducts()" style="padding: 10px 20px; cursor: pointer; background: #1976d2; color: white; border: none; border-radius: 4px;">
        Cargar Datos del Backend
      </button>

      <div style="margin: 20px auto; max-width: 400px; text-align: left;">
        <ul style="list-style: none; padding: 0;">
          @for (product of products; track product.id) {
            <li style="padding: 10px; background: #e3f2fd; margin-bottom: 5px; border-radius: 5px;">
              <strong>ID:</strong> {{ product.id }} - <strong>Nombre:</strong> {{ product.name }}
            </li>
          } @empty {
            <li style="padding: 10px; color: #666;">Haz clic en el botón para cargar los datos...</li>
          }
        </ul>
      </div>
    </div>
  `
})
export class ProductListComponent implements OnInit {
  // NUEVA FORMA DE INYECTAR DEPENDENCIAS
  http = inject(HttpClient);
  products: any[] = [];

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any[]>('/api/products').subscribe(data => this.products = data);
  }
}
