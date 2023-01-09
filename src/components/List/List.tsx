import TodoItem from 'components/List/TodoItem/TodoItem';
import TodoItemInput from 'components/List/TodoItemInput/TodoItemInput';
import useTodoList from 'hooks/useTodoList';
import React, { useMemo } from 'react';
import listStyles from './List.module.css';

interface Props {
  name: string;
  id: string;
}

const List: React.FC<Props> = ({ name, id }) => {
  const { todoItems: allTodoItems, createNewItem } = useTodoList();
  const todoItems = useMemo(
    () => allTodoItems.filter(({ listId }) => listId === id),
    [allTodoItems]
  );

  return (
    <div className={listStyles.container}>
      <h3 className={listStyles.header}>{name}</h3>
      <TodoItemInput createNewItem={name => createNewItem({ name, listId: id })} />
      {todoItems.map(({ id, name: todoItemName }) => (
        <TodoItem key={id} name={todoItemName} />
      ))}
    </div>
  );
};

export default List;
