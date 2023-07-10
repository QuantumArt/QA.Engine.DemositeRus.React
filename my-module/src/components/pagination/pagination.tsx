import React from 'react';
import classnames from 'classnames';
import { DOTS, usePagination } from 'src/hooks/usePagination';

interface Props {
  className: string;
  pageSize: number;
  totalCount: number;
  currentPage: number;
  siblingCount?: number;
  onPageChange: (page: number) => void;
}

const Pagination = (props: Props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = +paginationRange[paginationRange.length - 1];

  return (
    <ul className={classnames('pagination', { [className]: className })}>
      {currentPage > 1 && (
        <li className={classnames('page-item')} onClick={onPrevious}>
          <button
            type="button"
            aria-label="предыдущая страница"
            className="pagination__arrow pagination__arrow--prev"
          />
        </li>
      )}
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber} className="pagination__list-item  dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={pageNumber}
            className={classnames('pagination__list-item ', {
              'pagination__list-item--current': pageNumber === currentPage,
            })}
            onClick={() => typeof pageNumber === 'number' && onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {currentPage < lastPage && (
        <li className={classnames('page-item')} onClick={onNext}>
          <button
            type="button"
            aria-label="следующая страница"
            className="pagination__arrow pagination__arrow--next"
          />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
