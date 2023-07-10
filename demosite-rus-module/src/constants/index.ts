import { ru } from 'date-fns/locale';

export class RouteLinks {
  static readonly HOME = '/home';
}

export const FNS_LOCALE = { locale: ru };

export const nameMask = /^(?=.{1,}$)[A-Za-zА-Яа-яЁ-ё]+(?:['_.\s][A-Za-zА-Яа-яЁ-ё]+)*$/;
export const phoneOrEmailMask =
  /^((\s*[\w.-]+@[\w-]+\.([\w-]+\.)?[A-Za-z]{2,8}\s*)|(((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}))$/;

export const animateHeightDuration = 500;
export const errorNameMsg = 'Неверно набрано имя';
//   export const errorTextMsg = 'Неверно набран комментарий';
