import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client';
import { NewsDetail } from 'src/types';

interface NewsPostsQueryResult {
  newsItems: {
    items: {
      id: number;
      title: string;
      postDate?: string;
      text: string;
    }[];
  };
}

export const getNewsDetail = async (
  client: ApolloClient<NormalizedCacheObject>,
  newsId: number,
): Promise<NewsDetail | null> => {
  const query = gql`
    query getNewsPosts($id: Decimal!) {
      newsItems(filter: { idEq: $id }) {
        items {
          id
          title
          postDate
          text
        }
      }
    }
  `;

  const { data }: { data: NewsPostsQueryResult } = await client.query({
    query,
    variables: { id: newsId },
  });

  if (!data?.newsItems?.items?.length) {
    return null;
  }

  return data.newsItems.items.map(({ id, title, postDate, text }) => ({
    id,
    title,
    postDate,
    text,
  }))[0];
};

// export class NewsPageDetailsStore {
//   constructor(
//     private readonly client: ApolloClient<NormalizedCacheObject>,
//     private newsId: number,
//   ) {
//     makeAutoObservable(this);
//   }

//   public newsPost: NewsPost | null = null;

//   public init = async () => {
//     try {
//       await this.getNewsDetail();
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   public getNewsDetail = async () => {
//     const query = gql`
//       query getNewsPosts($id: Decimal!) {
//         newsItems(filter: { idEq: $id }) {
//           items {
//             id
//             title
//             postDate
//             text
//           }
//         }
//       }
//     `;

//     try {
//       const { data }: { data: NewsPostsQueryResult } = await this.client.query({
//         query,
//         variables: { id: this.newsId },
//       });

//       this.newsPost = data.newsItems.items.map(({ id, title, postDate, text }) => ({
//         id,
//         title,
//         postDate,
//         text,
//       }))[0];

//       console.log('this.newsPost', this.newsPost.title);
//     } catch (e) {
//       console.error(e);
//     }
//   };
// }
