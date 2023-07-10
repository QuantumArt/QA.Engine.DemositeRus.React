import { AbstractControl, FormControl } from '@quantumart/mobx-form-validation-kit';
import classNames from 'classnames';
import React from 'react';
import { observer } from 'mobx-react-lite';

interface Props {
  formControl: AbstractControl;
  className?: string;
}

const InputValidation = observer((props: Props): JSX.Element => {
  const { formControl, className }: Props = props;

  if (!formControl.touched || !formControl.hasErrors()) {
    return <></>;
  }

  return (
    <>
      {formControl.hasErrors() &&
        formControl.errors
          .map(e => e.message)
          .concat(formControl.serverErrors)
          .map(errorMessage => (
            <span
              key={errorMessage}
              className={classNames('validation', 'validation--error', className)}
            >
              {errorMessage}
            </span>
          ))}
    </>
  );
});

export default InputValidation;
