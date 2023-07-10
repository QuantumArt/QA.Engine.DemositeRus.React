import React from 'react';
import { collapseProps } from 'src/utilities/collapse-props';
import Slider, { Settings } from 'react-slick';
import { NextArrow, PrevArrow } from 'src/common-components/slider-arrows';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { getBanners } from 'src/api';
import { Banner } from 'src/types';
import { Link } from 'react-router-dom';

interface IProps {
  banneritemids: number[];
}

interface IComponentProps {
  banners: Banner[];
}

export async function getStaticProps(
  propsOrg: IProps,
  client: ApolloClient<NormalizedCacheObject>,
): Promise<IComponentProps> {
  const props = collapseProps(propsOrg);
  const banners = await getBanners(client, props.banneritemids ?? []);
  return {
    banners,
  };
}

const BannerWidget = (props: IComponentProps) => {
  const sliderSettings: Settings = {
    className: 'banner-slider__slides',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // autoplaySpeed: sliderRef.current?.("autoplay-speed") ? parseInt(autoplaySpeed) : 5000,
  };

  return (
    <section className="page__section">
      <div className="wrapper">
        <div className="banner-slider">
          <div className="banner-slider__box">
            <Slider {...sliderSettings} data-banner-slider>
              {props.banners.map((banner, index) => {
                const { imageUrl, text, url } = banner;

                if (!imageUrl) {
                  return text;
                }

                return (
                  <Link className="banner-slider__item" to={url ?? '/'} key={index}>
                    <img className="banner-slider__image-desktop" alt="" src={imageUrl} />
                    <img className="banner-slider__image-mobile" alt="" src={imageUrl} />
                  </Link>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerWidget;
