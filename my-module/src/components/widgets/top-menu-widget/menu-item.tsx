import { PageNode } from '@quantumart/qp8-widget-platform-bridge';
import React, { useState } from 'react';
import { Height } from 'react-animate-height';
import classNames from 'classnames';
import useIsTablet from 'src/hooks/useIsTablet';
import WithAnimatedHeight from 'src/components/animated-height/animated-height';
import { Link } from 'react-router-dom';

interface Props {
  children: PageNode[];
  link: string;
  title: string;
}

const MenuItem = ({ children, link, title }: Props) => {
  const [height, setHeight] = useState<Height>(0);

  return (
    <li
      className={classNames('menu__item', {
        'is-open': height !== 0,
      })}
    >
      <div className="menu-category">
        <Link className="menu-category__link" to={link}>
          {title}
        </Link>
        {!!children.length && (
          <span
            className="menu-category__arrow"
            onClick={() => setHeight(height === 0 ? 'auto' : 0)}
          ></span>
        )}
      </div>

      {!!children.length && (
        <WithAnimatedHeight animated={useIsTablet()} height={height}>
          <ul className="menu" style={{ display: 'block' }}>
            {children.map(subitem => (
              <li className="menu__item" key={subitem.link}>
                <Link className="menu-link" to={subitem.link}>
                  {subitem.title}
                </Link>
              </li>
            ))}
          </ul>
        </WithAnimatedHeight>
      )}
    </li>
  );
};

export default MenuItem;
