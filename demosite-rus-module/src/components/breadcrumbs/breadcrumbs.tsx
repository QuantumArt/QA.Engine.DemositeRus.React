import React from 'react';
import { useWPRoutesStore } from '@quantumart/qp8-widget-platform-bridge';
import { Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const wpRoutes = useWPRoutesStore();
  const routes = wpRoutes.getBreadcrumbs();

  if (routes.length > 1) {
    return (
      <div className="wrapper">
        <div className="breadcrumbs">
          <ul className="breadcrumbs__list">
            {routes.map((route, index) => (
              <li className="breadcrumbs__list-item" key={route.link}>
                {index === routes.length - 1 ? (
                  <span>{route.title}</span>
                ) : (
                  <Link to={route.link}>{route.title}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return null;
};

export default Breadcrumbs;
