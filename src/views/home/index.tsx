import React from "react";
import { useState, ChangeEvent } from "react";
import { List } from "../../components";
import "./index.scss";
import { useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Edge } from "../../components/interfaces";

const GET_REPOSITORIES = gql`
  query SearchRepositories($query: String!, $first: Int, $cursor: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $cursor) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
            stargazers {
              totalCount
            }
            url
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
  const [getRepositories, { loading, data, error, fetchMore }] =
    useLazyQuery(GET_REPOSITORIES);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleChange = () => {
    getRepositories({ variables: { query: query, first: 10 } });
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

  if (error) {
    return <p></p>;
  }

  return (
    <div className="home">
      <h1 className="home__title">Поиск репозитория</h1>
      <h4 className="home__subtitle">C помощью GraphQL</h4>
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
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {loading && <p>Loading...</p>}
          {data?.search && (
            <List
              items={data.search.edges.map((edge: Edge) => {
                return edge.node;
              })}
              loadMore={loadMore}
              hasNextPage={data.search.pageInfo.hasNextPage}
              className="home__list"
            />
          )}
        </>
      )}
    </div>
  );
};
