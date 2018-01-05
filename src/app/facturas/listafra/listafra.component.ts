import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listafra',
  templateUrl: './listafra.component.html',
  styleUrls: ['./listafra.component.css']
})
export class ListafraComponent implements OnInit {

  facturas: any;
  id: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getFacturas();
  }

  getFacturas() {
    this.http.get('http://localhost:3000/factura').subscribe(facturas => {
      this.facturas = facturas;
    });
  }

  setId(id) {
    this.id = id;
  }

  delete() {
    this.http.delete('http://localhost:3000/factura/' + this.id).subscribe(res => {
      this.getFacturas();
    }, (err) => {
      console.log('fallo');
    })
  }

}
