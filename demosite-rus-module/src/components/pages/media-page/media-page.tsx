import 'slick-carousel/slick/slick.css';

import parse from 'html-react-parser';
import React, { useRef } from 'react';
import Slider, { Settings } from 'react-slick';
import { MediaEvent, MediaStore } from 'src/api/media';
import { NextArrow, PrevArrow } from 'src/common-components/slider-arrows';
import Breadcrumbs from 'src/components/breadcrumbs/breadcrumbs';
import Fancybox from 'src/components/fancybox/fancybox';
import FoldBox from 'src/components/foldbox/foldbox';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

interface IProps {}

interface IComponentProps {
  mediaStore: MediaStore;
}

export async function getStaticProps(
  _: IProps,
  client: ApolloClient<NormalizedCacheObject>,
): Promise<IComponentProps> {
  const mediaStore = new MediaStore(client);
  await mediaStore.init();
  return {
    mediaStore,
  };
}

const MediaPage = (props: IComponentProps) => {
  const slidersRef = useRef<(Slider | null)[]>([]);

  const sliderSettings: Settings = {
    infinite: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  const { firstDay, prevDays } = props.mediaStore;

  const renderGallery = (
    day: MediaEvent,
    ref: React.MutableRefObject<(Slider | null)[]>,
    index: number,
  ) => {
    const { id, images } = day;

    return (
      <div className="event__gallery">
        <Fancybox>
          <div className="event__slider">
            <Slider
              {...sliderSettings}
              ref={ref => {
                slidersRef.current.push(ref);
              }}
            >
              {images.map(image => (
                <div className="event__slider-item" key={image.id}>
                  <a href={image.image} data-fancybox={id}>
                    <img src={image.image} alt={image.title} />
                  </a>
                </div>
              ))}
            </Slider>

            <div className="event__slider-footer">
              <div className="event__slider-nav" data-es-nav>
                <PrevArrow
                  className="slick-arrow slick-prev"
                  onClick={() => ref.current[index]?.slickPrev()}
                />
                <NextArrow
                  className="slick-arrow slick-next"
                  onClick={() => {
                    ref.current[index]?.slickNext();
                  }}
                />
              </div>
            </div>
          </div>
        </Fancybox>
      </div>
    );
  };

  const renderFirstDay = () => {
    if (!firstDay) {
      return null;
    }

    const { text, textBelow, title } = firstDay;

    return (
      <section className="page__section">
        <Breadcrumbs />
        <div className="wrapper">
          <div className="page__block">
            <h1 className="h1 center">{title}</h1>
            <div className="page__block">
              <div className="event">
                <div dangerouslySetInnerHTML={{ __html: text }}></div>
              </div>

              {renderGallery(firstDay, slidersRef, 0)}

              {!!textBelow && parse(textBelow)}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderPrevDays = () => (
    <section className="page__section">
      <div className="wrapper">
        {prevDays.map((day, index) => {
          const { id, text, textBelow, title } = day;

          return (
            <FoldBox
              key={id}
              title={title}
              text={text}
              textBelow={textBelow}
              renderGallery={() => renderGallery(day, slidersRef, index + 1)}
            />
          );
        })}
      </div>
    </section>
  );

  return (
    <>
      {renderFirstDay()}
      {renderPrevDays()}
    </>
  );
};

export default MediaPage;
