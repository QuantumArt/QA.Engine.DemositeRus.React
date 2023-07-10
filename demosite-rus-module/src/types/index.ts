export interface BannersQueryResult {
  bannerItems: {
    items: {
      id: number;
      text?: string;
      sortOrder: number;
      image?: string;
      uRL?: string;
    }[];
  };
}

export interface NewsCategoriesQueryResult {
  newsCategories: {
    items: {
      id: number;
      alternativeTitle: string;
      alias: string;
      sortOrder: number;
    }[];
  };
}

export interface NewsPostsQueryResult {
  newsItems: {
    items: {
      id: number;
      title: string;
      postDate: string;
      brief: string;
    }[];
  };
}

export interface Banner {
  id: number;
  text: string | undefined;
  url: string | undefined;
  imageUrl: string | undefined;
  sortOrder: number;
}

export interface NewsCategoryItem {
  id: number;
  alias: string;
  title: string;
  url: string;
  sortOrder: number;
}

export interface NewsPost {
  id: number;
  title: string;
  postDate: string;
  brief?: string;
  url?: string;
}

export interface NewsDetail {
  id: number;
  title: string;
  url?: string;
  postDate?: string;
  text: string;
  commonText?: string;
}

export interface FoldboxListItem {
  id: number;
  title: string;
  text: string;
  sortOrder: number;
}
