import React from 'react';

type SliderArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export const PrevArrow = (props: SliderArrowProps) => {
    const { className, style, onClick } = props;
  
    return (
      <button type="button" onClick={onClick} className={className} style={{ ...style }}>
        Previous
      </button>
    );
  };
  

export const NextArrow = (props: SliderArrowProps) => {
  const { className, style, onClick } = props;

  return (
    <button type="button" onClick={onClick} className={className} style={{ ...style }}>
      Next
    </button>
  );
};
