import $ from 'jquery';
import React, { useEffect } from 'react';
import { WidgetZone, useZoneStore } from '@quantumart/qp8-widget-platform-bridge';
import { collapseProps } from 'src/utilities/collapse-props';
import {
  closeFoldbox,
  getData,
  initSlick,
  initTabs,
  openFoldbox,
  setBodyOverflow,
  toggleBtnText,
  unSlick,
} from './helpers';
import Breadcrumbs from 'src/components/breadcrumbs/breadcrumbs';

interface IProps {
  text?: string;
  hidetitle: boolean;
}

const TextPage = (propsOrg: IProps): JSX.Element => {
  const ZoneStore = useZoneStore();
  const props = collapseProps(propsOrg);

  useEffect(() => {
    const $popups = $('[data-popup]');
    $popups.hide();

    $('[data-popup-close]').on('click', function () {
      $(this).closest('[data-popup]').fadeOut(200);
      setTimeout(() => setBodyOverflow('auto'), 200);
    });

    $('[data-popup-id]').on('click', function () {
      const id = getData('[data-popup-id]', this);

      $popups.each(function () {
        const popupId = getData('[data-popup]', this);

        if (popupId === id) {
          $(this).fadeIn(200);
          setBodyOverflow('hidden');
        } else {
          $(this).hide();
        }
      });
    });

    const $tabsNavItems = $('[data-tabs-nav-item]');
    $tabsNavItems.each(function () {
      const isActive = $(this).hasClass('active');

      if (isActive) {
        initTabs(this);
      }
    });
    $tabsNavItems.on('click', function () {
      initTabs(this);
    });

    $('[data-foldbox-head]').on('click', function () {
      const currentFoldbox = $(this).parent();
      const isActive = currentFoldbox.hasClass('active');
      const fbList = $(this).closest('[data-foldbox-list]');

      if (isActive) {
        closeFoldbox(currentFoldbox);
      } else {
        openFoldbox(currentFoldbox);
      }

      if (fbList.length) {
        toggleBtnText(fbList);
      }
    });

    $('[data-on]').on('click', function () {
      const onValue = getData('[data-on]', this);
      const currentValue = $(this).text();
      const currentFoldboxList = $(this).closest('[data-foldbox-list]');
      const foldboxes = currentFoldboxList.find('[data-foldbox]');
      foldboxes.each(function () {
        if (onValue !== currentValue) {
          closeFoldbox(this);
        } else {
          openFoldbox(this);
        }
      });
      toggleBtnText(currentFoldboxList);
    });

    const tabsCardSlider = {
      sliderSettings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              arrows: false,
              dots: true,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              arrows: false,
              dots: true,
            },
          },
        ],
      },
      setSettings: function setSettings(settings: any) {
        this.sliderSettings = $.extend(true, this.sliderSettings, settings);
      },
      getSliderSettings: function getSliderSettings() {
        return this.sliderSettings;
      },
      initSlider: function initSlider(tabNavItem: any) {
        const _self = this;
        const tabNavItemId = getData('[data-tabs-nav-item]', tabNavItem);
        const $sliderBoxes = $(tabNavItem).closest('[data-tabs]').find('[data-cs]');

        $sliderBoxes.each(function () {
          const sliderBoxId = getData('[data-cs]', this);
          const $slider = $(this).find('[data-cs-slider]');

          if (sliderBoxId === tabNavItemId) {
            const $sliderNav = $(this).find('[data-cs-nav]');

            _self.setSettings({
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    appendDots: $sliderNav,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    appendDots: $sliderNav,
                  },
                },
              ],
              slidesToShow: parseInt($slider.attr('data-slider-count') ?? '') || 3,
            });
            initSlick($slider, _self.sliderSettings);
          } else {
            unSlick($slider);
          }
        });
      },
    };

    $('[data-tabs-nav-item]').each(function () {
      const isActive = $(this).hasClass('active');

      if (isActive) {
        tabsCardSlider.initSlider(this);
      }
    });
    $('[data-tabs-nav-item]').on('click', function () {
      tabsCardSlider.initSlider(this);
    });
  }, []);

  return (
    <>
      {!props.hidetitle && <Breadcrumbs />}
      <WidgetZone name="Content" />
      <ZoneStore.DynamicZone html={props.text ?? ''} />
      <WidgetZone name="ContentBelow" />
    </>
  );
};

export default TextPage;
