import React from "react";
import { useState } from "react";
import { List } from "../../components";
import "./index.scss"

const items = [
  {
    title: "фывдьфывдл",
  },
  {
    title: "фывдьфывдл",
  },
];

export const Index: React.FC = () => {
  const [searchVal, setSearchVal] = useState(null)

  const changeHandler = () => {

  }

  return (
    <div className="home">
      <h1>Поиск репозитория </h1>
      <h4>C помощью GraphQL</h4>
      <div className="search-block home__search-block">
        <input className="search-block__input" type="text"/>
        <input className="search-block__btn" type="button"/>
      </div>
      <List items={items} className="home__list"/>
    </div>
  );
};

