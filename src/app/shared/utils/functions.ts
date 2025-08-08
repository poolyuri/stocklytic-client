import { AbstractControl, ValidatorFn } from '@angular/forms';

import { FormValidator } from '@core';

export const Guid = (length: number): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

export const FormErrorMessage = (control: AbstractControl, formValidator: FormValidator): string => {
  let c = '';
  if (control.hasError('required')) {
    c = `${formValidator.name} es requerido`;
  } else if (control.hasError('minlength')) {
    c = `Mínimo ${formValidator.minLength} carácteres`;
  } else if (control.hasError('maxlength')) {
    c = `Máximo ${formValidator.maxLength} carácteres`;
  } else if (control.hasError('min') && formValidator.type === 'digits') {
    c = `Mínimo ${formValidator.minLength} dígitos`;
  } else if (control.hasError('max') && formValidator.type === 'digits') {
    c = `Máximo ${formValidator.maxLength} dígitos`;
  } else if (control.hasError('min') && formValidator.type === 'values') {
    c = `Valor mínimo de ${formValidator.minLength.toFixed(2)}`;
  } else if (control.hasError('max') && formValidator.type === 'values') {
    c = `Valor máximo de ${formValidator.maxLength.toFixed(2)}`;
  } else if (control.hasError('email')) {
    c = 'Email es iválido';
  } else if (control.hasError('invalidAutocompleteObject') && AutocompleteValidator(control)) {
    c = `${formValidator.name} es inválido`;
  }
  return c;
};

const AutocompleteValidator = (control: AbstractControl): boolean => {
  return (typeof control.value === 'string');
}

export const AutocompleteObjectValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (typeof control.value === 'string') {
      return { 'invalidAutocompleteObject': { value: control.value } };
    }
    return null;  /* valid option selected */
  }
}

export function Base64ToFile(data: string): File {
  const arr = data.split(',');
  const bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);

  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], `${Guid(15)}.jpg`, { type: 'image/jpg' });
}

export function BlobToFile(blob: Blob): File {
  return new File([blob], `${Guid(15)}.jpg`, { type: 'image/jpg'});
}
