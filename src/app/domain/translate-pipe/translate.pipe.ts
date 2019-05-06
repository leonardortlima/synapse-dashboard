import { Pipe, PipeTransform } from '@angular/core';
import { TRANSLATE } from 'src/app/translate';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return TRANSLATE[value];
  }

}
