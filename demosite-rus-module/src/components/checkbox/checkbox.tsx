import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { FormControl } from '@quantumart/mobx-form-validation-kit';

export interface CheckboxItem {
  id: number;
  label: string;
}

interface Props {
  formControl: FormControl<boolean>;
  label?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Checkbox = observer((props: Props): JSX.Element => {
  const { formControl, disabled, label, className, onClick }: Props = props;

  const handleClick = (): void => {
    if (disabled) {
      return;
    }
    formControl.setTouched(true);
    formControl.value = !formControl.value;

    onClick?.();
  };

  return (
    <div className={classNames('checkbox', className)} onClick={handleClick}>
      <label className="checkbox__label">
        <input
          className="checkbox__input"
          type="checkbox"
          checked={formControl.value}
          onClick={e => e.stopPropagation()}
          onChange={() => {}}
        />
        <span className="checkbox__marker"></span>
        <span className="checkbox__text">{label}</span>
      </label>
    </div>
  );
});

export default Checkbox;
