import {
  FormControl,
  ValidationEvent,
  ValidationEventTypes,
} from '@quantumart/mobx-form-validation-kit';

export function minLengthFieldValidator(minLength: number, msg: string) {
  return async (control: FormControl<string | null>): Promise<ValidationEvent[]> => {
    if (control.value && control.value.trim().length < minLength) {
      return [
        {
          message: msg,
          type: ValidationEventTypes.Error,
        },
      ];
    }

    return [];
  };
}

// export function maxLengthFieldValidator(maxLength: number, msg: string) {
//   return async (control: FormControl<string | null>): Promise<ValidationEvent[]> => {
//     if (control.value && control.value.trim().length > maxLength) {
//       return [
//         {
//           message: msg,
//           type: ValidationEventTypes.Error,
//         },
//       ];
//     }

//     return [];
//   };
// }
