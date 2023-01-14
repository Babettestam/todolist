import ListName from 'components/List/ListName/ListName';
import TodoItem from 'components/TodoItem/TodoItem';
import TodoItemInput from 'components/TodoItem/TodoItemInput/TodoItemInput';
import useTodoItems from 'hooks/useTodoItems';
import React from 'react';
import listStyles from './List.module.css';
import { ReactComponent as Close } from 'assets/icons/close.svg';

interface Props {
  name: string;
  id: string;
  onRemoveList: ({ id }: { id: string }) => void;
}

const List: React.FC<Props> = ({ name, id, onRemoveList }) => {
  const { todoItems, createNewItem, updateItem, removeItem, markAsDone, moveItemDown, moveItemUp } =
    useTodoItems({ listId: id });

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
          moveDown={() => moveItemDown({ id: todoItemId })}
          moveUp={() => moveItemUp({ id: todoItemId })}
        />
      ))}
      <button
        className={listStyles.closeButton}
        onClick={() => onRemoveList({ id })}
        title="Remove list"
      >
        <Close className={listStyles.closeIcon} />
      </button>
    </div>
  );
};

export default List;
