import { ItemService } from './item.service';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ArtikleValidators {
  static idFormat(fc: AbstractControl): ValidationErrors | null {
    if (
      String(fc.value).substring(0, 2).toLocaleUpperCase() == 'IT' &&
      String(fc.value).length == 8
    ) {
      return null;
    } else if (
      String(fc.value).substring(0, 2).toLocaleUpperCase() == 'DE' &&
      String(fc.value).length == 10
    ) {
      return null;
    }
    return { idFormat: true };
  }

  static noCommas(fc: AbstractControl): ValidationErrors | null {
    if (fc.value == null || Number.isInteger(fc.value)) {
      return null;
    }
    return { noCommas: true };
  }

  static greaterZero(fc: AbstractControl): ValidationErrors | null {
    if (fc.value == null || Number.parseFloat(fc.value) >= 0) {
      return null;
    }
    return { greaterZero: true };
  }

  static purchasingGreaterRetail(fg: AbstractControl): ValidationErrors | null {
    const purchasingPrice = (fg as FormGroup).controls.purchasingPrice.value;
    const retailPrice = (fg as FormGroup).controls.retailPrice.value;
    if (
      (purchasingPrice == null && retailPrice == null) ||
      purchasingPrice <= retailPrice
    ) {
      return null;
    }
    return { purchasingGreaterRetail: true };
  }

  static differentURLs(fa: AbstractControl): ValidationErrors | null {
    let controls = (fa as FormArray).controls;
    for (let i = 0; i < controls.length; i++) {
      const element1 = controls[i];
      for (let j = i + 1; j < controls.length; j++) {
        const element2 = controls[j];
        if (element1.get('url')?.value === element2.get('url')?.value) {
          return { differentURLs: true };
        }
      }
    }
    return null;
  }

  // static zipExists(is: ItemService) {
  //   return function (control: AbstractControl): Observable<ValidationErrors | null> {
  //     return is.getItem().pipe(map((data) => (data ? null : { zipExists: true })));
  //   };
  // }
}
