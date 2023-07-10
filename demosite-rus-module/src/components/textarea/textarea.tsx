import React from 'react';
import { FormControl, TextAreaFormControl } from '@quantumart/mobx-form-validation-kit';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import InputValidation from 'src/components/validation/validation';

interface Props {
  id?: string;
  className?: string;
  classNameContainer?: string;
  formControl: FormControl<string | null>;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
}

const Textarea = observer((props: Props): JSX.Element => {
  const { formControl, className, classNameContainer, placeholder, maxLength, rows = 4 } = props;

  const isInvalid = formControl.touched && formControl.invalid;
  const isValid = formControl.dirty && formControl.valid;

  return (
    <div className={classNames(classNameContainer)}>
      <textarea
        {...TextAreaFormControl.bindActions(formControl as FormControl<string>)}
        className={classNames(className, {
          invalid: isInvalid,
          valid: isValid,
        })}
        value={formControl.value ?? ''}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
      />
      {formControl.touched && <InputValidation formControl={formControl} />}
    </div>
  );
});

export default Textarea;
