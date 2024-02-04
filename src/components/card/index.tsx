import React from "react";
import "./index.scss";

interface UserData{
    title: string
}

interface Props{
    data: UserData
}

export const Index: React.FC<Props> = ({data}) => {
  return (
    <div className="card">
      <h3 className="card__title">{data.title}</h3>
      <div className="card__body"></div>
    </div>
  );
};
