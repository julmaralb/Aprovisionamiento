import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verfra',
  templateUrl: './verfra.component.html',
  styleUrls: ['./verfra.component.css']
})
export class VerfraComponent implements OnInit {

  facturaForm : FormGroup;
  factura : any;
  tipo: any;
  iva: 0;
  total: 0;

  constructor(private ff: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getId(this.route.snapshot.params['id']);
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
  }

  getId(id) {
    return this.http.get('http://localhost:3000/factura/' + id).subscribe(data => {
      this.factura = data;
    });
  }

  initItem() {
    return this.ff.group({
      producto : null,
      importe : null
    });
  }

}
