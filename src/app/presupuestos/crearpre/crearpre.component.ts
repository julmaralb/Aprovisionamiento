import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crearpre',
  templateUrl: './crearpre.component.html',
  styleUrls: ['./crearpre.component.css']
})
export class CrearpreComponent implements OnInit {

  presupuestoForm: FormGroup;
  presupuesto: any;
  proveedores: any;
  proveedor: any;
  importe: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;
  enviado : boolean = false;

  constructor(private pf: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getProveedores();
    this.presupuestoForm = this.pf.group({
      proveedor: null,
      fecha: null,
      concepto: null,
      importe: null,
      tipo: null,
      iva: this.iva,
      total: this.total
    });
    this.onChanges();
  }

  onChanges() {
    this.presupuestoForm.valueChanges.subscribe(valor => {
      this.importe = valor.importe;
      this.tipo = valor.tipo;
      this.presupuestoForm.value.iva = this.importe * this.tipo;
      this.presupuestoForm.value.total = this.importe + this.presupuestoForm.value.iva;
    });
  }

  savePresupuesto() {
    const savePresupuesto = {
      proveedor: this.presupuestoForm.get('proveedor').value,
      fecha: this.presupuestoForm.get('fecha').value,
      concepto: this.presupuestoForm.get('concepto').value,
      importe: this.presupuestoForm.get('importe').value,
      tipo: this.presupuestoForm.get('tipo').value,
      iva: this.presupuestoForm.get('iva').value,
      total: this.presupuestoForm.get('total').value
    };

    return savePresupuesto;
  }

  getProveedores() {
    this.http.get('http://localhost:3000/proveedor').subscribe(proveedores => {
      this.proveedores = proveedores;
    });
  }

  onSubmit() {
    this.presupuesto = this.savePresupuesto();
    this.http.post('http://localhost:3000/presupuesto', this.presupuesto).subscribe(res => {
      this.enviado = true;
      setTimeout(()=>{
        this.router.navigate(['/lista-presupuestos']);
      },1000)
      // this.presupuestoForm.reset();
    }, (err) => {
      console.log(err);
    });
  }

}
