import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crearpro',
  templateUrl: './crearpro.component.html',
  styleUrls: ['./crearpro.component.css']
})
export class CrearproComponent implements OnInit {

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
  enviado : boolean = false;

  provincias : string[] = ['Álava','Albacete','Alicante','Almería','Asturias','Ävila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];
  

  constructor(private pf: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
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
    this.http.post('http://localhost:3000/proveedor', this.proveedor).subscribe(res => {
      this.enviado = true;
      setTimeout(()=>{
        this.router.navigate(['/lista-proveedores']);
      },1000)
    }, (err) => {
      console.log(err);
    });
  }

}
