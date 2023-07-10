import React from 'react';
import Slider, { Settings } from 'react-slick';
import { NextArrow, PrevArrow } from 'src/common-components/slider-arrows';
import { FNS_LOCALE } from 'src/constants';
import { NewsPost } from 'src/types';
import 'slick-carousel/slick/slick.css';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface IComponentProps {
  title: string;
  url: string;
  newsPosts: NewsPost[];
}

const NewsCategory = (props: IComponentProps) => {
  const slider = React.useRef<Slider>();

  const sliderSettings: Settings = {
    className: 'news__slider',
    infinite: false,
    dots: true,
    arrows: false,
    appendDots: dots => (
      <div>
        <div className="news__slider-nav">
          <PrevArrow
            className="slick-arrow slick-prev"
            onClick={() => slider.current?.slickPrev()}
          />
          <ul>{dots}</ul>
          <NextArrow
            className="slick-arrow slick-next"
            onClick={() => slider.current?.slickNext()}
          />
        </div>
      </div>
    ),
  };

  return (
    <div className="news__col">
      <div className="news__tile">
        <h4 className="news__tile-title">{props.title}</h4>

        <Slider {...sliderSettings} ref={slider as React.LegacyRef<Slider> | undefined}>
          {props.newsPosts.map(newsPost => {
            const { brief, id, postDate, title, url } = newsPost;

            return (
              <div className="news__card" key={id}>
                <div className="news__card-title">
                  {url ? <Link to={url}>{title}</Link> : title}
                </div>
                <div className="news__card-date">
                  {format(new Date(postDate), 'dd MMMM, yyyy', FNS_LOCALE)}
                </div>
                <div className="news__card-descr">{brief}</div>
              </div>
            );
          })}
        </Slider>

        <Link className="news__tile-read-more" to={props.url}>
          Все {props.title}
        </Link>
      </div>
    </div>
  );
};

export default NewsCategory;
