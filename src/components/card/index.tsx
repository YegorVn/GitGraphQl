import React from "react";
import "./index.scss";
import { CardProps } from "../interfaces";


export const Index: React.FC<CardProps> = ({data, className}) => {
    console.log(data && data.name)
  return (
    <div className={`card ${className}`}>
      <h3 className="card__title">{data.name}</h3>
      <div className="card__body"></div>
    </div>
  );
};
