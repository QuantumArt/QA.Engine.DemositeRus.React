import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { FormControl } from '@quantumart/mobx-form-validation-kit';

interface Props<TEntity> {
  formControl: FormControl<TEntity>;
  data: TEntity;
  name: string;
  className?: string;
  label?: string;
  disabled?: boolean;
  onClick?: (value: TEntity) => void;
}

const Radio = observer(<TEntity extends any>(props: Props<TEntity>): JSX.Element => {
  const { className, formControl, disabled, label, data, onClick } = props;

  const handleClick = (): void => {
    if (disabled) {
      return;
    }
    formControl.setTouched(true);
    formControl.value = data;
    onClick?.(data);
  };

  return (
    <div className={classNames('radio', className)}>
      <label className="radio__label">
        <input
          className="radio__input"
          type="radio"
          checked={formControl.value === data}
          name={props.name}
          onClick={handleClick}
          onFocus={() => formControl.setFocused(true)}
          onBlur={() => formControl.setFocused(false)}
          onChange={() => {}}
        />
        <span className="radio__marker"></span>
        <span className="radio__text">{label}</span>
      </label>
    </div>
  );
});

export default Radio;

// import React from 'react';
// import { useObserver } from 'mobx-react-lite';
// import { FormControl } from '@quantumart/mobx-form-validation-kit';
// import { CFormGroup, CLabel, CInputRadio } from '@coreui/react';

// interface IRadioProps<TEntity> {
//   id: string;
//   name: string;
//   data: TEntity;
//   formControl: FormControl<TEntity>;
//   label?: string;
//   disabled?: boolean;
//   onClick?: (value: TEntity) => void;
//   inline?: boolean;
// }

// export const Radio = <TEntity extends any>(
//   props: IRadioProps<TEntity>,
// ): JSX.Element => {
//   const { formControl, disabled, id, label, data, onClick } = props;
//   // const isError = formControl.touched && formControl.hasErrors();
//   // const isWarning = formControl.touched && formControl.hasWarnings();
//   // const isSuccess = formControl.touched && formControl.hasSuccesses();

//   const handleClick = (): void => {
//     if (disabled) return;
//     formControl.setTouched(true);
//     formControl.value = data;
//     onClick && onClick(data);
//   };

//   return useObserver(() => (
//     <CFormGroup variant="custom-radio" inline={props.inline}>
//       <CInputRadio
//         id={id}
//         checked={formControl.value === data}
//         invalid={formControl.invalid && formControl.touched}
//         onClick={handleClick}
//         onChange={() => {}}
//         name={props.name}
//         custom={true}
//         onFocus={() => formControl.setFocused(true)}
//         onBlur={() => formControl.setFocused(false)}
//         disabled={disabled}
//       />
//       <CLabel htmlFor={id} variant="custom-checkbox">
//         {label || ''}
//       </CLabel>
//     </CFormGroup>
//   ));
// };
