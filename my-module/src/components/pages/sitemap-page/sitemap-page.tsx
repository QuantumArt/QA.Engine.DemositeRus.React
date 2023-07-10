import { PageNode, useWPRoutesStore } from '@quantumart/qp8-widget-platform-bridge';
import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const MAX_LEVEL = 5;

const SitemapPage = () => {
  const wpRoutes = useWPRoutesStore();
  const routes = wpRoutes.getSiteMap();

  const getSiteMapList = useCallback(
    (routes: PageNode[], level = 0) => {
      if (routes.length && level < MAX_LEVEL) {
        return (
          <ul className="unordered-list">
            {routes
              .map(route => (
                <li
                  className={classNames({
                    'last-li-mapsite': !route.children?.length,
                  })}
                  key={route.link}
                >
                  <Link
                    to={route.link}
                    className={classNames({
                      'unordered-list__title': level === 0 || route.children.length,
                    })}
                  >
                    {route.title}
                  </Link>
                  {getSiteMapList(route.children, level + 1)}
                </li>
              ))}
          </ul>
        );
      }

      return [];
    },
    [routes],
  );

  return (
    <div className="page__section">
      <div className="wrapper">{getSiteMapList(routes)}</div>
    </div>
  );
};

export default SitemapPage;
