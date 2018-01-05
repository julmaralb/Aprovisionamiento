import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-buscarpro',
  templateUrl: './buscarpro.component.html',
  styleUrls: ['./buscarpro.component.css']
})
export class BuscarproComponent implements OnInit {

  campoBusqueda: FormControl;
  campoLocalidad: FormControl;
  searchForm: FormGroup;
  proveedores: any;
  datos: any;
  sinresultados: boolean = false;
  pornombre: boolean = true;
  porlocalidad: boolean = false;

  constructor(private http: HttpClient, private sf: FormBuilder) { }

  ngOnInit() {
    this.buscaNombre();
    this.buscaLocalidad();
    this.searchForm = this.sf.group({
      nombre: null,
      localidad: null
    });
  }

  buscaNombre() {
    this.campoBusqueda = new FormControl();
    this.campoBusqueda.valueChanges.subscribe(nombre => {
      if (nombre.length !== 0) {
        return this.http.get('http://localhost:3000/proveedor/nombre/' + nombre).subscribe(res => {
          this.proveedores = res;
          if (this.proveedores.length === 0) {
            this.sinresultados = true;
          } else {
            this.sinresultados = false;
          }
        }, (err) => {
          console.log(err);
        });
      } else {
        this.proveedores = [];
      }
    });
  }

  buscaLocalidad() {
    this.campoLocalidad = new FormControl();
    this.campoLocalidad.valueChanges.subscribe(localidad => {
      if (localidad.length !== 0) {
        return this.http.get('http://localhost:3000/proveedor/localidad/' + localidad).subscribe(res => {
          this.proveedores = res;
          if (this.proveedores.length === 0) {
            this.sinresultados = true;
          } else {
            this.sinresultados = false;
          }
        }, (err) => {
          console.log(err);
        });
      } else {
        this.proveedores = [];
      }
    });
  }

  onSubmit() {
    this.pornombre = false;
    this.porlocalidad = false;
    this.datos = this.saveDatos();
    this.http.get('http://localhost:3000/proveedor/mixto/' + this.datos.nombre + '/' + this.datos.localidad).subscribe(res => {
      this.proveedores = res;
      if (this.proveedores.length === 0) {
        this.sinresultados = true;
      } else {
        this.sinresultados = false;
      }
    }, (err) => {
      console.log(err);
    });
  }

  saveDatos() {
    const saveDatos = {
      nombre: this.searchForm.get('nombre').value,
      localidad: this.searchForm.get('localidad').value
    };
    return saveDatos;
  }

  porNombre() {
    this.pornombre = true;
    this.porlocalidad = false;
    this.proveedores = [];
    this.campoBusqueda.setValue('');
  }

  porLocalidad() {
    this.pornombre = false;
    this.porlocalidad = true;
    this.proveedores = [];
    this.campoLocalidad.setValue('');
  }

}
