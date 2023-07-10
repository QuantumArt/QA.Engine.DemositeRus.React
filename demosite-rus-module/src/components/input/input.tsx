import React from 'react';
import classNames from 'classnames';
import { FormControl } from '@quantumart/mobx-form-validation-kit/dist/form-control';
import { observer } from 'mobx-react-lite';
import InputValidation from 'src/components/validation/validation';

export enum InputType {
  Text = 'text',
  Email = 'email',
  Phone = 'tel',
}

interface Props {
  id: string;
  formControl: FormControl<string | null>;
  type?: InputType;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
  classNameContainer?: string;
}

const Input = observer((props: Props): JSX.Element => {
  const { formControl, type = InputType.Text } = props;
  const isInvalid = formControl.touched && formControl.invalid;
  const isFocused = formControl.focused;
  const isValid = formControl.dirty && formControl.valid;

  return (
    <div className={props.classNameContainer}>
      <input
        type={type}
        spellCheck={false}
        ref={element => {
          props.formControl.element = element;
        }}
        id={props.id}
        name={props.id}
        placeholder={props.placeholder}
        value={formControl.value ?? ''}
        disabled={props.disabled}
        className={classNames(props.className, {
          invalid: isInvalid,
          focused: isFocused,
          valid: isValid,
          disabled: props.disabled,
        })}
        maxLength={props.maxLength}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          formControl.value = event.target.value;
        }}
        onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
          formControl.setTouched(true);
          formControl.setFocused(false);
        }}
        onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
          formControl.setFocused(true);
        }}
      />
      {formControl.touched && <InputValidation formControl={formControl} />}
    </div>
  );
});

export default Input;
