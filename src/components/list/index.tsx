import React from "react";
import { Card } from "..";

interface UserData {
  title: string;
}

interface Props {
  items: Array<UserData>;
  className: string
}

export const Index: React.FC<Props> = ({ items, className }) => {
  return (
    <div className={`list ${className}`}>
      {items.map((el) => {
        return <Card data={el}/>;
      })}
    </div>
  );
};
