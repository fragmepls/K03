import { FormControl, FormGroup, FormArray } from '@angular/forms';

export class UserValidators {
  static passwordFormat(fc: FormControl): { [error: string]: any } | null {
    const passwordPattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    return passwordPattern.test(fc.value) ? null : { passwordFormat: { valid: false } };
  }

  static passwordSame(fg: FormGroup): { [error: string]: any } | null {
    const password = fg.controls.password.value;
    const passwordRepeat = fg.controls.passwordRepeat.value;
    return (password === passwordRepeat) ? null : { passwordSame: { valid: false } };
  }

  static atLeastOneEmail(fa: FormArray): { [error: string]: any } | null {
    const containsValue = fa.controls.some(e => e.value ? true : false);
    return containsValue ? null : { atLeastOneEmail: { valid: false } };
  }
}
