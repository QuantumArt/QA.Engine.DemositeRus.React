import React from 'react';
import { getNewsCategories, getNewsPosts } from 'src/api';
import NewsCategory from './news-category';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { collapseProps } from 'src/utilities/collapse-props';
import { NewsCategoryItem } from 'src/types';

interface IProps {
  title: string;
}

interface IComponentProps {
  title: string;
  newsCategories: NewsCategoryItem[];
  newsPosts: any[];
}

export async function getStaticProps(
  propsOrg: IProps,
  client: ApolloClient<NormalizedCacheObject>,
): Promise<IComponentProps> {
  const props = collapseProps(propsOrg);
  
  const newsCategories = await getNewsCategories(client);
  const newsPosts = await Promise.all(
    newsCategories.map(
      async newsCategory => await getNewsPosts(client, newsCategory.id, newsCategory.alias ?? []),
    ),
  );

  return {
    title: props.title,
    newsCategories,
    newsPosts,
  };
}

const NewsroomWidget = (props: IComponentProps) => (
  <section className="news">
    <div className="wrapper">
      <h2 className="news__title">{props.title}</h2>
      <div className="news__group">
        {props.newsCategories.map((newsCategory, index) => {
          const { id, title, url } = newsCategory;

          return (
            <NewsCategory key={id} title={title} url={url} newsPosts={props.newsPosts[index]} />
          );
        })}
      </div>
    </div>
  </section>
);

export default NewsroomWidget;
