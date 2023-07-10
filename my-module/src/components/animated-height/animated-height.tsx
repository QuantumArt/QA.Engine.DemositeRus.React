import React, { ReactNode } from 'react';
import AnimateHeight, { Height } from 'react-animate-height';
import { animateHeightDuration } from 'src/constants';

interface Props {
  animated: boolean;
  children: JSX.Element;
  height: Height;
  duration?: number;
}

const WithAnimatedHeight = ({
  animated,
  children,
  duration = animateHeightDuration,
  height,
}: Props) =>
  animated ? (
    <AnimateHeight duration={duration} height={height}>
      {children}
    </AnimateHeight>
  ) : (
    children
  );

export default WithAnimatedHeight;
