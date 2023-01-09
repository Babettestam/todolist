import React from "react";

interface Props {
  name: string;
}

const TodoItem: React.FC<Props> = ({ name }) => <div>{name}</div>;

export default TodoItem;
