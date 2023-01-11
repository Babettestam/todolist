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
  const {
    todoItems: allTodoItems,
    createNewItem,
    updateItem,
    removeItem,
    markAsDone,
  } = useTodoList();
  const todoItems = useMemo(
    () => allTodoItems.filter(({ listId }) => listId === id),
    [allTodoItems]
  );

  return (
    <div className={listStyles.container}>
      <h3 className={listStyles.header}>{name}</h3>
      <TodoItemInput onSubmit={name => createNewItem({ name, listId: id })} />
      {todoItems.map(({ id: todoItemId, done, name: todoItemName }) => (
        <TodoItem
          key={id}
          done={done}
          name={todoItemName}
          onChange={name => updateItem({ name, id: todoItemId })}
          onRemove={() => removeItem({ id: todoItemId })}
          markAsDone={() => markAsDone({ id: todoItemId, done: !done })}
        />
      ))}
    </div>
  );
};

export default List;
