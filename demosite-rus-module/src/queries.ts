import { gql } from '@apollo/client';

export const GET_NEWS_POSTS_LIST = gql`
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

