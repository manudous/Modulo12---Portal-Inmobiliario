import { Validators, createFormValidation } from '@lemoncode/fonk';
import { positiveNumber } from '@lemoncode/fonk-positive-number-validator';
import { arrayRequired } from '@lemoncode/fonk-array-required-validator';
const validationSchema = {
  field: {
    title: [
      {
        validator: Validators.required,
        message: 'Por favor complete este campo obligatorio',
      },
      {
        validator: Validators.minLength,
        customArgs: { length: 3 },
        message: 'El valor proporcionado no cumple con la longitud mínima',
      },
    ],

    notes: [
      {
        validator: Validators.required,
        message: 'Por favor complete este campo obligatorio',
      },
      {
        validator: Validators.minLength,
        customArgs: { length: 3 },
        message: 'El valor proporcionado no cumple con la longitud mínima',
      },
    ],

    email: [
      {
        validator: Validators.required,
        message: 'Por favor complete este campo obligatorio',
      },
      {
        validator: Validators.email,
        message: 'Email no válido',
      },
    ],

    phone: [
      {
        validator: Validators.required,
        message: 'Por favor complete este campo obligatorio',
      },
      {
        validator: Validators.pattern,
        customArgs: {
          pattern: /^\(]?[\+]?(\d{2}|\d{3})[\)]?[\s]?((\d{6}|\d{8})|(\d{3}[\*\.\-\s]){3}|(\d{2}[\*\.\-\s]){4}|(\d{4}[\*\.\-\s]){2})|\d{8}|\d{10}|\d{12}&/,
        },
        message: 'Número de teléfono introducido incorrecto',
      },
    ],

    price: [
      {
        validator: positiveNumber.validator,
        message: 'Por favor introduzca una cantidad correcta',
      },
      {
        validator: Validators.required,
        message: 'Por favor complete este campo obligatorio',
      },
    ],

    saleTypes: [
      {
        validator: arrayRequired.validator,
        customArgs: { minLength: 1, maxLength: 4 },
        message: 'La lista debe tener elementos',
      },
    ],

    address: [
      {
        validator: Validators.required,
        message: 'Por favor complete este campo obligatorio',
      },
      {
        validator: Validators.minLength,
        customArgs: { length: 3 },
        message: 'El valor proporcionado no cumple con la longitud mínima',
      },
    ],

    city: [
      {
        validator: Validators.required,
        message: 'Por favor complete este campo obligatorio',
      },
      {
        validator: Validators.minLength,
        customArgs: { length: 3 },
        message: 'Debe elegir al menos una opción',
      },
    ],
    province: [
      {
        validator: Validators.required,
        message: 'Por favor seleccione una provincia',
      },
    ],

    squareMeter: [
      {
        validator: positiveNumber.validator,
        message: 'Por favor introduzca un número',
      },
      {
        validator: Validators.required,
        message: 'Por favor complete este campo obligatorio',
      },
    ],

    rooms: [
      {
        validator: positiveNumber.validator,
        message: 'Por favor introduzca un número',
      },
      {
        validator: Validators.required,
        message: 'Por favor complete este campo obligatorio',
      },
    ],

    bathrooms: [
      {
        validator: positiveNumber.validator,
        message: 'Por favor introduzca un número',
      },
      {
        validator: Validators.required,
        message: 'Por favor complete este campo obligatorio',
      },
    ],

    mainFeatures: [
      {
        validator: arrayRequired.validator,
        customArgs: { minLength: 1, maxLength: 30 },
        message: 'Debe añadir al menos una característica',
      },
    ],

    locationUrl: [
      {
        validator: Validators.required,
        message: 'Por favor complete este campo obligatorio',
      },
      {
        validator: Validators.pattern,
      customArgs: { pattern: /^(http|https)\:\/\/www\.google\.com\/maps\/embed\?/ },
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
