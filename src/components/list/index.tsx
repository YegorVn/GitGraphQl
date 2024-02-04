import React from "react";
import { Card } from "..";
import "./index.scss";
import { ListProps } from "../interfaces";
import InfiniteScroll from "react-infinite-scroll-component";

export const Index: React.FC<ListProps> = ({
  items,
  className,
  loadMore,
  hasNextPage,
}) => {
  return (
    <InfiniteScroll
      dataLength={items ? items.length : 0}
      next={loadMore}
      hasMore={hasNextPage}
      loader={<p>Loading more...</p>}
      className={`list ${className}`}>
      {items &&
        items.map((el) => {
          return <Card key={el.id} data={el} className="list__card" />;
        })}
    </InfiniteScroll>
  );
};
