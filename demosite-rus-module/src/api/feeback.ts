import {
  ControlsCollection,
  FormControl,
  FormGroup,
  patternValidator,
  requiredValidator,
  wrapperSequentialCheck,
} from '@quantumart/mobx-form-validation-kit';
import { makeAutoObservable } from 'mobx';
import { errorNameMsg, nameMask, phoneOrEmailMask } from 'src/constants';
import { BootState } from 'src/constants/boot-state';

// const phoneNumberCode = ['+', '7', ' '];
// const phoneNumberBody = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
// export const phoneNumberReg = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

// export const emailMask =
//   /^([\w\.]+([^.!#$%&‘*+—/=?^`{|}~]))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

// export const phoneNumber = [...phoneNumberCode, ...phoneNumberBody];

// export const passwordMask = /^\S{6,}$/;

// export const nameMask = /^(?=.{1,}$)[A-Za-zА-Яа-яЁ-ё]+(?:['_.\s][A-Za-zА-Яа-яЁ-ё]+)*$/;

// export const onlyDigitsMask = /^[\d]*$/;

interface FeedbackForm extends ControlsCollection {
  name: FormControl<string | null>;
  phoneOrEmail: FormControl<string | null>;
  text: FormControl<string | null>;
}

export class FeedbackStore {
  public bootState: BootState = BootState.None;
  public form: FormGroup<FeedbackForm> | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  public init = async () => {
    this.form = new FormGroup<FeedbackForm>({
      name: new FormControl<string | null>(null, {
        validators: [
          wrapperSequentialCheck([
            requiredValidator('Введите имя'),
            patternValidator(nameMask, errorNameMsg),
          ]),
        ],
      }),
      phoneOrEmail: new FormControl<string | null>(null, {
        validators: [
          wrapperSequentialCheck([
            requiredValidator('Введите телефон или Email'),
            patternValidator(phoneOrEmailMask, 'Неверный телефон или Email'),
          ]),
        ],
      }),
      text: new FormControl<string | null>(null, {
        validators: [wrapperSequentialCheck([requiredValidator('Введите описание')])],
      }),
    });
  };

  public send = async (): Promise<void> => {
    await this.form?.wait();
    if (this.form?.invalid) {
      this.form.setTouched(true);
      return;
    }
    this.bootState = BootState.Success;
  };
}
