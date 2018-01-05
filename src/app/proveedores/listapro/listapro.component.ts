import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listapro',
  templateUrl: './listapro.component.html',
  styleUrls: ['./listapro.component.css']
})
export class ListaproComponent implements OnInit {

  proveedores: any;
  id: any;
  cargando : boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProveedores();
  }

  getProveedores() {
    this.http.get('http://localhost:3000/proveedor').subscribe(proveedores => {
      this.proveedores = proveedores;
      this.cargando = false;
    });
  }

  setId(id){
    this.id = id;
  }

  delete() {
    this.http.delete('http://localhost:3000/proveedor/' + this.id).subscribe(res => {
      this.getProveedores();
    }, (err) => {
      console.log('fallo');
    })
  }
}