import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  cargada: boolean = false;
  info: InfoPagina = {};
  equipo: any[] = [];
  constructor(public http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json').subscribe((resp: InfoPagina) => {
      //console.log(resp);
      this.cargada = true;
      this.info = resp;
    });
  }

  private cargarEquipo() {
    this.http.get('https://angular-html-11f64.firebaseio.com/equipo.json').subscribe((resp: any[]) => {
      //console.log("EQUIPO", resp);
      //this.cargada = true;
      this.equipo = resp;
    });
  }
}
