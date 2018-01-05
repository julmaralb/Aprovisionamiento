import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verpre',
  templateUrl: './verpre.component.html',
  styleUrls: ['./verpre.component.css']
})
export class VerpreComponent implements OnInit {

  presupuestoForm: FormGroup;
  proveedor: any;
  presupuesto: any;
  importe: any;
  tipo: any;
  iva: 0;
  total: 0;

  constructor(private pf: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getId();
    this.presupuestoForm = this.pf.group({
      proveedor: null,
      fecha: null,
      concepto: null,
      importe: null,
      tipo: null,
      iva: null,
      total: null
    });
  }

  getId(){
    return this.http.get('http://localhost:3000/presupuesto/' + this.route.snapshot.params['id']).subscribe(data => {
      this.presupuesto = data;
    });
  }

}
