import React, { useState } from 'react';
import { RouteLinks } from 'src/constants';
import { Link } from 'react-router-dom';
import { PageNode, useWPRoutesStore } from '@quantumart/qp8-widget-platform-bridge';
import classNames from 'classnames';
import NavListItem from './nav-list-item';

interface IProps {}

const TopMenuWidget = (props: IProps): JSX.Element => {
  const wpRoutes = useWPRoutesStore();
  const routes = wpRoutes.getSiteMap();
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <header className="header">
      <div className="wrapper">
        <div className="header__group">
          <div className="logo">
            <Link to={RouteLinks.HOME}>
              <img src="/static/images/demo-logo.jpg" alt="logo-image" />
            </Link>
          </div>

          <nav
            className={classNames('nav', {
              'is-open-mobile': menuOpened,
            })}
          >
            <div className="nav__burger" onClick={() => setMenuOpened(true)}>
              <img src="/static/images/menu.svg" alt="menu" />
            </div>
            <div className="nav__box">
              <div className="nav__close" onClick={() => setMenuOpened(false)}>
                <img src="/static/images/close.svg" alt="close menu" />
              </div>

              <div className="nav__menu">
                <ul className="nav__list">
                  {routes
                    .map((route: PageNode) => (
                      <NavListItem
                        key={route.link}
                        children={route.children}
                        link={route.link}
                        title={route.title}
                      />
                    ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default TopMenuWidget;
