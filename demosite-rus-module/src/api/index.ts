import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client';
import {
  Banner,
  BannersQueryResult,
  NewsCategoriesQueryResult,
  NewsCategoryItem,
  NewsPost,
  NewsPostsQueryResult,
} from '../types';
import { NewsPostsListQueryResult } from './news-posts-list';

export const getBanners = async (client: ApolloClient<NormalizedCacheObject>, ids: number[]) => {
  const query = gql`
    query getBanners($ids: [Decimal!]) {
      bannerItems(filter: { idIn: $ids }) {
        items {
          id
          text
          sortOrder
          image
          uRL
        }
      }
    }
  `;

  const { data }: { data: BannersQueryResult } = await client.query({ query, variables: ids });

  if (!data?.bannerItems?.items?.length) {
    return [];
  }

  const banners: Banner[] = data.bannerItems.items.map(({ id, text, uRL, image, sortOrder }) => ({
    id,
    text,
    url: uRL,
    imageUrl: image,
    sortOrder,
  }));

  banners.sort((a, b) => a.sortOrder - b.sortOrder);

  return banners;
};

export const getNewsCategories = async (client: ApolloClient<NormalizedCacheObject>) => {
  const query = gql`
    query getNewsCategories {
      newsCategories(filter: { showOnStartEq: true }) {
        items {
          id
          alternativeTitle
          alias
          sortOrder
        }
      }
    }
  `;

  const { data }: { data: NewsCategoriesQueryResult } = await client.query({ query });

  if (!data?.newsCategories?.items?.length) {
    return [];
  }

  const newsCategories: NewsCategoryItem[] = data.newsCategories.items.map(
    ({ id, alias, alternativeTitle, sortOrder }) => ({
      id,
      alias,
      title: alternativeTitle,
      url: `/news_and_events/${alias}`,
      sortOrder,
    }),
  );

  newsCategories.sort((a, b) => a.sortOrder - b.sortOrder);

  return newsCategories;
};

export const getNewsPosts = async (
  client: ApolloClient<NormalizedCacheObject>,
  categoryId: number,
  categoryAlias: string,
) => {
  const query = gql`
    query getNewsPosts($categoryId: Int!, $first: Int!) {
      newsItems(first: $first, order: [PostDateDesc], filter: { categoryEq: $categoryId }) {
        items {
          id
          title
          postDate
          brief
        }
      }
    }
  `;

  const { data }: { data: NewsPostsQueryResult } = await client.query({
    query,
    variables: { categoryId, first: 3 },
  });

  if (!data?.newsItems?.items?.length) {
    return null;
  }

  const newsPosts: NewsPost[] = data.newsItems.items.map(({ id, title, postDate, brief }) => ({
    id,
    title,
    postDate,
    brief,
    url: `/news_and_events/${categoryAlias}/details/${id}`,
  }));

  return newsPosts;
};

export const getNewsPostsList = async (
  client: ApolloClient<NormalizedCacheObject>,
  categoryId: number,
) => {
  const query = gql`
    query getNewsPosts($categoryId: Int!) {
      newsItems(filter: { categoryEq: $categoryId }, order: [PostDateDesc]) {
        items {
          id
          title
          postDate
          brief
        }
      }
    }
  `;

  const { data }: { data: NewsPostsListQueryResult } = await client.query({
    query,
    variables: { categoryId },
  });

  if (!data?.newsItems?.items?.length) {
    return [];
  }

  return data.newsItems.items.map(({ id, title, postDate, brief }) => ({
    id,
    title,
    postDate,
    brief,
  }));
};
