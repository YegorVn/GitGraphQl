// Card fields
export interface CardData {
  name: string;
  id: number;
  stargazers: { totalCount: number };
  url: string;
}

// Edge
export interface Edge {
  node: CardData;
  __typename: string;
}

// Card
export interface CardProps {
  data: CardData;
  className: string;
}

// List
export interface ListProps {
  items: Array<CardData>;
  className: string;
  loadMore: () => void;
  hasNextPage: boolean;
}
