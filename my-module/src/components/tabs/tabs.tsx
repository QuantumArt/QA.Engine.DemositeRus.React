import 'slick-carousel/slick/slick.css';

import classNames from 'classnames';
import parse from 'html-react-parser';
import { useObserver } from 'mobx-react-lite';
import React, { useState } from 'react';
import Slider, { Settings } from 'react-slick';

interface Props {
  items: {
    id: number;
    title: string;
    text: string;
  }[];
};

const Tabs = ({ items }: Props): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);

  const sliderSettings: Settings = {
    className: 'card-slider__slides',
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    arrows: true,
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
    appendDots: dots => (
      <>
        <div className="card-slider__nav">
          <ul className="slick-dots">{dots}</ul>
        </div>
      </>
    ),
  };

  return useObserver(() => {
    return (
      <div className="tabs">
        <div className="tabs__nav">
          <div className="tabs__nav-box">
            {items.map((item, index) => {
              const { id, title } = item;

              return (
                <div
                  className={classNames('tabs__nav-item', {
                    active: activeTab === index,
                  })}
                  key={id}
                  onClick={() => setActiveTab(index)}
                >
                  {title}
                </div>
              );
            })}
          </div>
          <div className="tabs__box">
            {items.map((item, index) => {
              const { id, text } = item;

              return (
                <div
                  className={classNames('tabs__item tabs__item--second', {
                    active: activeTab === index,
                  })}
                  key={id}
                >
                  <div className="tabs__item-box">
                    <div className="card-slider">
                      <div className="card-slider__box">
                        <Slider {...sliderSettings}>{parse(text)}</Slider>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  });
};

export default Tabs;
