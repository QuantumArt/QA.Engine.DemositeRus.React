import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client';
import { NewsPost } from 'src/types';
import { makeAutoObservable, toJS } from 'mobx';

export interface NewsPostsListQueryResult {
  newsItems: {
    items: {
      id: number;
      title: string;
      postDate: string;
      brief: string;
    }[];
  };
}

interface PageFilter {
  year: number;
  month: number;
}

export class NewsPostsListStore {
  constructor(
    private readonly client: ApolloClient<NormalizedCacheObject>,
    private categoryId: number,
  ) {
    makeAutoObservable(this);
  }

  public originalNewsItems: NewsPost[] = [];
  public filteredNewsItems: NewsPost[] = [];

  public years: number[] = [];
  public readonly months = [
    [0, 'Все'],
    [1, 'Январь'],
    [2, 'Февраль'],
    [3, 'Март'],
    [4, 'Апрель'],
    [5, 'Май'],
    [6, 'Июнь'],
    [7, 'Июль'],
    [8, 'Август'],
    [9, 'Сентябрь'],
    [10, 'Октябрь'],
    [11, 'Ноябрь'],
    [12, 'Декабрь'],
  ];

  public init = async () => {
    try {
      await this.getNewsPostsList();

      this.filteredNewsItems = this.originalNewsItems;
      this.years = this.getYearsList(this.originalNewsItems);
    } catch (e) {
      console.error(e);
    }
  };

  public pageFilter: PageFilter = {
    year: 0,
    month: 0,
  };

  public changeFilter = (year: number, month?: number) => {
    this.pageFilter = {
      year,
      month: month ? +month : 0,
    };

    this.filteredNewsItems = this.filter(this.originalNewsItems, this.pageFilter);
  };

  public filter = (items: NewsPost[], filter: PageFilter) =>
    items.filter(({ postDate }) => {
      const date = new Date(postDate);
      
      return (
        (filter.year === 0 || date.getFullYear() === filter.year) &&
        (filter.month === 0 || date.getMonth() + 1 === filter.month)
      );
    });

  public getNewsPostsList = async () => {
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

    try {
      const { data }: { data: NewsPostsListQueryResult } = await this.client.query({
        query,
        variables: { categoryId: this.categoryId },
      });

      this.originalNewsItems =
        data.newsItems.items.map(({ id, title, postDate, brief }) => ({
          id,
          title,
          postDate,
          brief,
        })) ?? [];
    } catch (e) {
      console.error(e);
    }
  };

  private getYearsList(items: NewsPost[]) {
    const years = items.map(({ postDate }) => new Date(postDate).getFullYear());
    years.sort((a, b) => b - a);

    return Array.from(new Set(years).values());
  }
}
