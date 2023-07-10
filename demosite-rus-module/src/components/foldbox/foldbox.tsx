import 'slick-carousel/slick/slick.css';

import classNames from 'classnames';
import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import AnimateHeight, { Height } from 'react-animate-height';
import { animateHeightDuration } from 'src/constants';

interface Props {
  title: string;
  text: string;
  textBelow?: string;
  opened?: boolean;
  renderGallery?: () => JSX.Element;
};

const FoldBox = ({ opened, text, textBelow, title, renderGallery }: Props) => {
  const [height, setHeight] = useState<Height>(opened ? 'auto' : 0);

  useEffect(() => {
    setHeight(opened ? 'auto' : 0);
  }, [opened]);

  return (
    <div
      className={classNames('foldbox', {
        active: height !== 0,
      })}
    >
      <div className="foldbox__head" onClick={() => setHeight(height === 0 ? 'auto' : 0)}>
        <div className="foldbox__title">{title}</div>
        <div className="foldbox__arrow"></div>
      </div>

      <AnimateHeight duration={animateHeightDuration} height={height}>
        <div className="foldbox__body" style={{ display: 'block' }}>
          <div className="page__block">
            <div className="event">{parse(text)}</div>

            {renderGallery?.()}

            {!!textBelow && parse(textBelow)}
          </div>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default FoldBox;
