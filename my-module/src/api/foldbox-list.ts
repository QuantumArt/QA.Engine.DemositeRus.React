import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client';

interface FoldboxListItemsQueryResult {
  foldBoxListItems: {
    items: {
      id: number;
      title: string;
      text: string;
      sortOrder: number;
    }[];
  };
}

export const getFoldboxItems = async (
  client: ApolloClient<NormalizedCacheObject>,
  ids: number[],
) => {
  const query = gql`
    query getFoldboxItems($ids: [Decimal!]) {
      foldBoxListItems(filter: { idIn: $ids }) {
        items {
          id
          title
          text
          sortOrder
        }
      }
    }
  `;

  const { data }: { data: FoldboxListItemsQueryResult } = await client.query({
    query,
    variables: { ids },
  });

  if (!data?.foldBoxListItems?.items?.length) {
    return [];
  }

  const items = data.foldBoxListItems.items.map(({ id, title, text, sortOrder }) => ({
    id,
    title,
    text,
    sortOrder,
  }));

  items.sort((a, b) => a.sortOrder - b.sortOrder);

  return items;
};
