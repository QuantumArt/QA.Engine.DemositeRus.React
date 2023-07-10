import $ from 'jquery';
import { Settings } from 'react-slick';
if (typeof window !== 'undefined') {
  require('slick-carousel');
}

export const getScrollWidth = () => {
  const windowWidth = typeof window === 'undefined' ? 0 : window.innerWidth;
  const bodyWidth = $('body').outerWidth() ?? 0;
  return Math.round(windowWidth - bodyWidth);
};

export const getSelectorWithKey = (selector: string, key: string) => {
  return ''.concat(selector.slice(0, -1), '=').concat(key, ']');
};

export const setBodyOverflow = (value: string) => {
  const scrollWidth = getScrollWidth();

  $('body').css({ paddingRight: value === 'hidden' ? scrollWidth : 0, overflow: value });
};

export const getPropName = (dataAttr: string) => {
  if (!dataAttr) return '';
  const parts = dataAttr.slice(6, -1).split('-');

  return parts
    .map(function (x, i) {
      if (i !== 0) {
        const firstLetter = x[0].toUpperCase();
        x = firstLetter + x.slice(1);
      }

      return x;
    })
    .join('');
};

export const getData = (dataAttr: string, el: HTMLElement | JQuery<HTMLElement>): string => {
  const prop = getPropName(dataAttr);

  return $(el).data(prop);
};

export const openFoldbox = (el: HTMLElement | JQuery<HTMLElement>) => {
  $(el).addClass('active');
  $(el).find('[data-foldbox-body]').slideDown();
};

export const closeFoldbox = (el: HTMLElement | JQuery<HTMLElement>) => {
  $(el).removeClass('active');
  $(el).find('[data-foldbox-body]').slideUp();
};

export const toggleBtnText = (el: JQuery<HTMLElement>) => {
  const $btn = el.find('[data-on]');
  const onValue = getData('[data-on]', $btn);
  const offValue = getData('[data-off]', $btn);
  const $foldboxes = el.find('[data-foldbox]');
  const allFoldboxStates: boolean[] = [];

  $foldboxes.each(function () {
    const state = $(this).hasClass('active');
    allFoldboxStates.push(state);
  });

  const isEveryOpened = allFoldboxStates.every(x => !!x);
  const isEveryClosed = allFoldboxStates.every(x => !x);

  if (isEveryOpened) {
    $btn.text(offValue);
    return;
  }

  if (isEveryClosed) {
    $btn.text(onValue);
    return;
  }
};

export const initTabs = (tabsNavItem: HTMLElement | JQuery<HTMLElement>) => {
  const $tabs = $(tabsNavItem).closest('[data-tabs]');
  const $tabsItems = $tabs.find('[data-tabs-item]');
  const $tabsNavItems = $tabs.find('[data-tabs-nav-item]');
  const id = getData('[data-tabs-nav-item]', tabsNavItem);
  const tabsItem = getSelectorWithKey('[data-tabs-item]', id);
  $tabsItems.hide();
  $tabsNavItems.removeClass('active');
  $(tabsNavItem).addClass('active');
  $tabs.find(tabsItem).show();
};

export const initSlick = (slider: JQuery<HTMLElement>, settings: Settings) => {
  ($(slider) as any)
    .not('.slick-initialized')
    .slick(settings as string);
};

export const unSlick = (slider: JQuery<HTMLElement>) => {
  const isInitialized = slider.hasClass('slick-initialized');

  if (isInitialized) {
    (slider as any).slick('unslick');
  }
};
