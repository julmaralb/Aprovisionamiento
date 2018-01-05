import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euros'
})
export class EurosPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value = new Intl.NumberFormat('es-ES', { style: 'currency', currency:'EUR' }).format(value);
    return value;
  }

}
