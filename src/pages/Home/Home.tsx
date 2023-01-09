import React, { useState } from "react";
import homeStyles from "pages/Home/Home.module.css";
import { ListItem, TodoItem } from "types";
import { v4 as uuid } from "uuid";
import List from "components/List/List";

const Home: React.FC = () => {
  const [lists] = useState<ListItem[]>([{ name: "Backlog", id: uuid() }]);
  const [todoItems] = useState<TodoItem[]>([]);

  return (
    <div className={homeStyles.ListContainer}>
      {lists.map(({ name, id }) => (
        <List
          key={id}
          name={name}
          todoItems={todoItems.filter(({ listId }) => listId === id)}
        />
      ))}
    </div>
  );
};

export default Home;
