import React, { useEffect, useState } from 'react';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { getNewsDetail } from 'src/api/news-page-details';
import { observer } from 'mobx-react-lite';
import { NewsDetail } from 'src/types';
import Breadcrumbs from 'src/components/breadcrumbs/breadcrumbs';
import { Link } from 'react-router-dom';

interface IProps {
  //   newsDetail: NewsDetail | null;
  newsId: number;
  client: ApolloClient<NormalizedCacheObject>;
}

const NewsPageDetails = observer(({ client, newsId }: IProps) => {
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const newsPost = await getNewsDetail(client, newsId);

      setNewsDetail(newsPost);
    };

    fetchData();
  }, []);

  if (!newsDetail) {
    return null;
  }

  return (
    <div className="page page-news-detail">
      <Breadcrumbs />
      <section className="page__section">
        <div className="page-news-detail__box">
          <h1 className="page__main-title">{newsDetail.title}</h1>
          <div className="page-news-detail__date">{newsDetail.postDate}</div>
          <div
            className="page-news-detail__descr"
            dangerouslySetInnerHTML={{ __html: newsDetail.text }}
          ></div>
          <div className="page-news-detail__link">
            <Link to="/news_and_events" className="read-more">
              Все Новости
            </Link>
          </div>
          <div className="page-news-detail__note">{newsDetail.commonText}</div>
        </div>
      </section>
    </div>
  );
});

export default NewsPageDetails;
