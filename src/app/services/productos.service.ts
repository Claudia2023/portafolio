import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(public http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http.get('https://angular-html-11f64.firebaseio.com/productos_idx.json').subscribe((resp: Producto[]) => {
        this.cargando = false;
        this.productos = resp;
        //setTimeout(() => this.cargando = false, 2000);
        resolve();
      });
    });
  }

  getProducto(IdProd: string) {
    return this.http.get(`https://angular-html-11f64.firebaseio.com/productos/${IdProd}.json`);
  }

  buscarProducto(buscar: string) {
    if (this.productos.length === 0) {
      this.cargarProductos().then(() => {
        this.filtrarProductos(buscar);
      });
    } else {
      this.filtrarProductos(buscar);
    }
  }

  private filtrarProductos(buscar: string) {
    buscar = buscar.toLocaleLowerCase()
    this.productosFiltrado = [];
    this.productos.forEach(prod => {
      if (prod.categoria.indexOf(buscar) >= 0 || prod.titulo.toLocaleLowerCase().indexOf(buscar) >= 0) {
        this.productosFiltrado.push(prod);
      }
    });
    //console.log(this.productos, this.productosFiltrado, "*****", buscar);
  }
}
