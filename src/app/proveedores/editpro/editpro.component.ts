import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editpro',
  templateUrl: './editpro.component.html',
  styleUrls: ['./editpro.component.css']
})
export class EditproComponent implements OnInit {

  proveedorForm: FormGroup;
  proveedor: any;
  nombre: string;
  cif: string;
  domicilio: string;
  cp: number;
  localidad: string;
  provincia : string;
  telefono: number;
  email: string;
  id: any;

  provincias : string[] = ['Álava','Albacete','Alicante','Almería','Asturias','Ävila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']

  constructor(private pf: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getId(this.route.snapshot.params['id']);
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

  getId(id) {
    this.http.get('http://localhost:3000/proveedor/' + id).subscribe(data => {
      this.proveedor = data;
    });
    this.id = id;
  }

  saveProveedor() {
    const saveProveedor = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      domicilio: this.proveedorForm.get('domicilio').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      email: this.proveedorForm.get('email').value
    };

    return saveProveedor;
  }

  onSubmit() {
    this.proveedor = this.saveProveedor();
    this.http.put('http://localhost:3000/proveedor/' + this.id, this.proveedor).subscribe(res => {
      this.router.navigate(['/lista-proveedores']);
    }, (err) => {
      console.log(err);
    });
  }

  delete(id: string) {
    this.http.delete('http://localhost:3000/proveedor/' + id).subscribe(res => {
      this.router.navigate(['/lista-proveedores']);
    }, (err) => {
      console.log('fallo');
    })
  }

}
