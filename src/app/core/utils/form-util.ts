import {FormGroup} from '@angular/forms';

export class FormUtil {

  static validForm(form: FormGroup): void {
    Object.keys(form.controls).forEach(campo => {
      const control = form.get(campo);
      control.markAsDirty();
    });
  }
}
