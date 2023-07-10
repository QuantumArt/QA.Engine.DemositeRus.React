import { PageNode } from '@quantumart/qp8-widget-platform-bridge';
import React, { useState } from 'react';
import { Height } from 'react-animate-height';
import classNames from 'classnames';
import MenuItem from './menu-item';
import WithAnimatedHeight from 'src/components/animated-height/animated-height';
import useIsTablet from 'src/hooks/useIsTablet';
import { Link } from 'react-router-dom';

interface Props {
  children: PageNode[];
  link: string;
  title: string;
}

const NavListItem = ({ children, link, title }: Props) => {
  const [height, setHeight] = useState<Height>(0);

  return (
    <li
      className={classNames('nav__list-item', {
        'is-open': height !== 0,
      })}
    >
      <div className="menu-category menu-category--main">
        {children.length ? (
          <>
            <span className="menu-category__link">{title}</span>
            <span
              className="menu-category__arrow"
              onClick={() => setHeight(height === 0 ? 'auto' : 0)}
            ></span>
          </>
        ) : (
          <Link className="menu-category__link" to={link}>
            {title}
          </Link>
        )}
      </div>

      {!!children.length && (
        <WithAnimatedHeight animated={useIsTablet()} height={height}>
          <div className="nav__submenu">
            <div className="wrapper">
              <div className="nav__submenu-group">
                <ul className="menu" style={{ display: 'block' }}>
                  {children.map(subcol => (
                    <MenuItem
                      key={subcol.link}
                      children={subcol.children}
                      link={subcol.link}
                      title={subcol.title}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </WithAnimatedHeight>
      )}
    </li>
  );
};

export default NavListItem;
