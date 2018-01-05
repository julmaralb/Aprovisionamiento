import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearfra',
  templateUrl: './crearfra.component.html',
  styleUrls: ['./crearfra.component.css']
})
export class CrearfraComponent implements OnInit {

  facturaForm : FormGroup;
  factura : any;
  tipo: any;
  iva: any = 0;
  total: any = 0;

  constructor(private ff : FormBuilder, private router : Router, private http : HttpClient) { }

  ngOnInit() {
    this.facturaForm = this.ff.group({
      proveedor : null,
      fecha : null,
      items: this.ff.array([
        this.initItem(),
      ]),
      base: null,
      tipo: null,
      iva: this.iva,
      total: this.total
    });
    this.onChanges();
  }

  initItem() {
    return this.ff.group({
      producto : null,
      importe : null
    });
  }

  addItem() {
    const control = <FormArray>this.facturaForm.controls['items'];
    control.push(this.initItem());
  }

  removeItem(i) {
    const control = <FormArray>this.facturaForm.controls['items'];
    control.removeAt(i);
  }

  onChanges() {
    this.facturaForm.valueChanges.subscribe(valor =>{
      var suma = 0;
      for (var i=0; i<valor.items.length; i++) {
        suma = suma + valor.items[i].importe;      
      }
      this.facturaForm.value.base = suma;
      this.tipo = valor.tipo;
      this.facturaForm.value.iva = this.facturaForm.value.base * this.tipo;
      this.facturaForm.value.total = this.facturaForm.value.base + this.facturaForm.value.iva;
    });
  }

  onSubmit() {
    this.factura = this.saveFactura();
    console.log(this.factura);
    this.http.post('http://localhost:3000/factura', this.factura).subscribe(res =>{
      this.router.navigate(['/lista-facturas']);
    }, (err) => {
      console.log(err);
    });
  }

  saveFactura() {
    const SaveFactura =  {
      proveedor : this.facturaForm.get('proveedor').value,
      fecha : this.facturaForm.get('fecha').value,
      items : this.facturaForm.get('items').value,
      base : this.facturaForm.get('base').value,
      tipo : this.facturaForm.get('tipo').value,
      iva : this.facturaForm.get('iva').value,
      total : this.facturaForm.get('total').value
    };
    return SaveFactura;
  }

}
