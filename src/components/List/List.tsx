import TodoItem from "components/TodoItem/TodoItem";
import React from "react";
import { TodoItem as TodoItemType } from "types";
import listStyles from "./List.module.css";

interface Props {
  name: string;
  todoItems: TodoItemType[];
}

const List: React.FC<Props> = ({ name, todoItems }) => {
  return (
    <div className={listStyles.container}>
      <h3 className={listStyles.header}>{name}</h3>
      {todoItems.map(({ id, name: todoItemName }) => (
        <TodoItem key={id} name={todoItemName} />
      ))}
    </div>
  );
};

export default List;
