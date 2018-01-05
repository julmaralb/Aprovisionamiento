import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editfra',
  templateUrl: './editfra.component.html',
  styleUrls: ['./editfra.component.css']
})
export class EditfraComponent implements OnInit {

  facturaForm: FormGroup;
  factura: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;
  id: any;

  constructor(private ff: FormBuilder, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }


  ngOnInit() {
    this.getId(this.route.snapshot.params['id']);
    this.facturaForm = this.ff.group({
      proveedor: null,
      fecha: null,
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

  getId(id) {
    this.http.get('http://localhost:3000/factura/' + id).subscribe(data => {
      this.factura = data;
      this.patchForm();
    });
    this.id = id;
  }

  initItem() {
    return this.ff.group({
      producto: null,
      importe: null
    });
  }

  patchForm() {
    this.facturaForm.patchValue({
      proveedor: this.factura.proveedor,
      fecha: this.factura.fecha,
      base: this.factura.base,
      tipo: this.factura.tipo,
      iva: this.factura.iva,
      total: this.factura.total
    })
    this.setFacturaItems();
  }

  setFacturaItems() {
    let control = <FormArray>this.facturaForm.controls.items;
    this.factura.items.forEach(x => {
      control.push(this.ff.group({
        producto: x.producto,
        importe: x.importe
      }))
    })
    this.removeItem(0);
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
    this.facturaForm.valueChanges.subscribe(valor => {
      var suma = 0;
      for (var i = 0; i < valor.items.length; i++) {
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
    this.http.put('http://localhost:3000/factura/' + this.id, this.factura).subscribe(res => {
      this.router.navigate(['/lista-facturas']);
      // this.presupuestoForm.reset();
    }, (err) => {
      console.log(err);
    });
  }

  saveFactura() {
    const SaveFactura = {
      proveedor: this.facturaForm.get('proveedor').value,
      fecha: this.facturaForm.get('fecha').value,
      items: this.facturaForm.get('items').value,
      base: this.facturaForm.get('base').value,
      tipo: this.facturaForm.get('tipo').value,
      iva: this.facturaForm.get('iva').value,
      total: this.facturaForm.get('total').value
    };
    return SaveFactura;
  }

}
