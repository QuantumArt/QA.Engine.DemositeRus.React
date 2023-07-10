import React from 'react';
import { collapseProps } from 'src/utilities/collapse-props';
import { NewsPostsListStore } from 'src/api/news-posts-list';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import NewsPageList from './news-page-list';
import NewsPageDetails from './news-page-details';
import { useWPRoutesStore } from '@quantumart/qp8-widget-platform-bridge';
import { NewsDetail } from 'src/types';

interface IProps {
  categoryid: number;
  title: string;
}

interface IComponentProps {
  title: string;
  store: NewsPostsListStore;
  client: ApolloClient<NormalizedCacheObject>;
}

interface PageDetailsProps {
  newsDetail: NewsDetail | null;
}

export function allowedSubpage(tailUrl: string) {
  return true;
}

export async function getStaticProps(
  propsOrg: IProps,
  client: ApolloClient<NormalizedCacheObject>,
): Promise<IComponentProps | PageDetailsProps> {
  // const detailPath = 'details';
  // const wpRoutesStore = useWPRoutesStore();
  // const tailUrl = wpRoutesStore.getTailUrl();
  // const isDetail = tailUrl.startsWith(detailPath);
  // const newsId = +tailUrl.substring(detailPath.length + 1);

  const props = collapseProps(propsOrg);

  //   if (!newsId) {
  const store = new NewsPostsListStore(client, props.categoryid);
  await store.init();

  return {
    title: props.title,
    store,
    client,
  };
  //   } else {
  //     // const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);

  //     const newsDetail = await getNewsDetail(client, newsId);

  //     return {
  //       newsDetail,
  //     };
  //   }
}

const NewsPage = (props: IComponentProps) => {
  const detailPath = 'details';
  const wpRoutesStore = useWPRoutesStore();
  const tailUrl = wpRoutesStore.getTailUrl();
  const [isDetail, setIsDetail] = React.useState(() => tailUrl.startsWith(detailPath));
  const newsId = +tailUrl.substring(detailPath.length + 1);

  React.useEffect(() => {
    setIsDetail(tailUrl.startsWith(detailPath));
  }, [tailUrl]);

  return isDetail ? (
    <NewsPageDetails newsId={newsId} client={props.client} />
  ) : (
    <NewsPageList {...props} />
  );
};

export default NewsPage;
