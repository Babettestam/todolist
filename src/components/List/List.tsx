import ListName from 'components/List/ListName/ListName';
import TodoItem from 'components/List/TodoItem/TodoItem';
import TodoItemInput from 'components/List/TodoItemInput/TodoItemInput';
import useTodoItems from 'hooks/useTodoItems';
import React from 'react';
import listStyles from './List.module.css';

interface Props {
  name: string;
  id: string;
}

const List: React.FC<Props> = ({ name, id }) => {
  const { todoItems, createNewItem, updateItem, removeItem, markAsDone } = useTodoItems();

  return (
    <div className={listStyles.container}>
      <ListName name={name} id={id} />
      <TodoItemInput onSubmit={name => createNewItem({ name })} />
      {todoItems.map(({ id: todoItemId, done, name: todoItemName }) => (
        <TodoItem
          key={todoItemId}
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
