import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    email: [
      {
        validator: Validators.email,
        message: 'Por favor introduzca un email correcto',
      },
      {
        validator: Validators.required,
        message: 'Por favor complete este campo obligatorio',
      },
    ],
    message: [
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
  },
};

export const formValidation = createFormValidation(validationSchema);
