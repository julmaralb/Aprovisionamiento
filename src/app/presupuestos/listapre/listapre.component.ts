import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listapre',
  templateUrl: './listapre.component.html',
  styleUrls: ['./listapre.component.css']
})
export class ListapreComponent implements OnInit {

  presupuestos: any;
  key : string = "proveedor";
  reverse : boolean = false;
  p: number = 1;
  ipp: number = 5;
  id: any;
  

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPresupuestos();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  setItemsPerPage(ipp) {
    this.ipp = ipp;
    console.log(ipp);
  }

  // sort(key) {
  //   if (this.key == key) {
  //     this.reverse = !this.reverse;
  //   } else {
  //     this.key = key;
  //     this.reverse = false;
  //   }
  // }

  getPresupuestos() {
    this.http.get('http://localhost:3000/presupuesto').subscribe(presupuestos => {
      this.presupuestos = presupuestos;
    });
  }

  setId(id){
    this.id = id;
  }

  delete() {
    this.http.delete('http://localhost:3000/presupuesto/' + this.id).subscribe(res => {
      this.getPresupuestos();
    }, (err) => {
      console.log('fallo');
    })
  }
}
