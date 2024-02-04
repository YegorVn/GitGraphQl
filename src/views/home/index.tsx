import React from "react";
import { useState, ChangeEvent } from "react";
import { List } from "../../components";
import "./index.scss";
import { useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Edge } from "../../components/interfaces";

const items = [
  {
    name: "фывдьфывдл",
    id: 1,
  },
  {
    name: "фывдьфывдл",
    id: 2,
  },
];

const GET_REPOSITORIES = gql`
  query SearchRepositories($query: String!, $cursor: String) {
    search(query: $query, type: REPOSITORY, first: 10, after: $cursor) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const Index: React.FC = () => {
  const [query, setQuery] = useState("");
  const [getRepositories, { loading, data, fetchMore }] =
    useLazyQuery(GET_REPOSITORIES);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleChange = () => {
    getRepositories({ variables: { query: query } });
  };

  const loadMore = () => {
    if (!loading && data?.search.pageInfo.hasNextPage) {
      fetchMore({
        variables: { cursor: data.search.pageInfo.endCursor },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            search: {
              ...prev.search,
              edges: [...prev.search.edges, ...fetchMoreResult.search.edges],
              pageInfo: fetchMoreResult.search.pageInfo,
            },
          };
        },
      });
    }
  };

  return (
    <div className="home">
      <h1>Поиск репозитория</h1>
      <h4>C помощью GraphQL</h4>
      <div className="search-block home__search-block">
        <input
          value={query}
          onChange={changeHandler}
          className="search-block__input"
          type="text"
        />
        <input
          onClick={handleChange}
          className="search-block__btn"
          type="button"
        />
      </div>
      <List
        items={
          data &&
          data.search.edges.map((el: Edge) => {
            return el.node;
          })
        }
        loadMore={loadMore}
        hasNextPage={data && data.search.pageInfo.hasNextPage}
        className="home__list"
      />
    </div>
  );
};
