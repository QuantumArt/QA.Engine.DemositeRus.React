import React, { useEffect, useMemo, useState } from 'react';
import Breadcrumbs from 'src/components/breadcrumbs/breadcrumbs';
import { format } from 'date-fns';
import { FNS_LOCALE } from 'src/constants';
import { NewsPostsListStore } from 'src/api/news-posts-list';
import { observer } from 'mobx-react-lite';
import Pagination from 'src/components/pagination/pagination';
import _ from 'lodash';
import { Link } from 'react-router-dom';

interface IComponentProps {
  title: string;
  store: NewsPostsListStore;
}

const NewsPageList = observer((props: IComponentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const { filteredNewsItems, months, pageFilter, years, changeFilter } = props.store;

  const data = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;

    return filteredNewsItems.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredNewsItems]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredNewsItems]);

  return (
    <div className="page page-news">
      <Breadcrumbs />

      <div className="wrapper">
        <section className="page__section">
          <h1 className="page__main-title">{props.title}</h1>
          <div className="page-news__filters">
            <div className="page-news__filters-item">
              <div className="select">
                <div className="select__group">
                  <label className="select__label" htmlFor="yearFilter">
                    Выберите год
                  </label>
                  <div className="select__box">
                    <select
                      id="yearFilter"
                      value={pageFilter.year}
                      onChange={e => changeFilter(+e.target.value)}
                    >
                      <option value="0">Все</option>
                      {years.map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="page-news__filters-item">
              <div className="select">
                <div className="select__group">
                  <label className="select__label" htmlFor="monthFilter">
                    Выберите месяц
                  </label>
                  <div className="select__box">
                    <select
                      id="monthFilter"
                      disabled={pageFilter.year === 0}
                      value={pageFilter.month}
                      onChange={e => changeFilter(pageFilter.year, +e.target.value)}
                    >
                      {months.map(month => (
                        <option key={month[0]} value={month[0]}>
                          {month[1]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section>
            <div className="page-news__list">
              <div className="news-list" data-news-list="">
                {data.map(newsPost => {
                  const { brief, id, postDate, title } = newsPost;

                  return (
                    <div key={id} className="news-list__item">
                      <div className="card">
                        <div className="card__date">
                          {format(new Date(postDate), 'dd MMMM, yyyy', FNS_LOCALE)}
                        </div>
                        <div className="card__title">
                          <Link to={`details/${id}`}>{title}</Link>
                        </div>
                        <div className="card__descr">{brief}</div>
                        <Link to={`details/${id}`} className="read-more card__read-more">
                          Читать...
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={filteredNewsItems.length}
              pageSize={pageSize}
              onPageChange={page => setCurrentPage(page)}
            />
          </section>
        </section>
      </div>
    </div>
  );
});

export default NewsPageList;
