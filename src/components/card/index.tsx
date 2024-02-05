import React from "react";
import "./index.scss";
import { CardProps } from "../interfaces";

export const Index: React.FC<CardProps> = ({ data, className }) => {
  console.log(data && data.name);
  return (
    <div className={`card ${className}`}>
      <a href={data.url} target="_blank" className="card__title">
        {data.name}
      </a>
      <div className="card__body">
        <div className="stargazers card__stargazers">
          <div className="stargazers__img"></div>
          <span>{`${data.stargazers.totalCount} stars`}</span>
        </div>
      </div>
    </div>
  );
};
