import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verpro',
  templateUrl: './verpro.component.html',
  styleUrls: ['./verpro.component.css']
})
export class VerproComponent implements OnInit {

  proveedorForm: FormGroup;
  proveedor: any;
  nombre: string;
  cif: string;
  domicilio: string;
  cp: number;
  localidad: string;
  provincia: string;
  telefono: number;
  email: string;

  constructor(private pf: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getId();
    this.proveedorForm = this.pf.group({
      nombre : null,
      cif : null,
      domicilio : null,
      cp : null,
      localidad : null,
      provincia : null,
      telefono : null,
      email : null
    });
  }

  getId(){
    return this.http.get('http://localhost:3000/proveedor/' + this.route.snapshot.params['id']).subscribe(data => {
      this.proveedor = data;
    });
  }

}
