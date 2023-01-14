import { useState } from 'react';
import { TodoItem } from 'types';
import { v4 as uuid } from 'uuid';

const useTodoItems = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  const updateItem = ({ id, name, done }: { id: string; name?: string; done?: boolean }): void => {
    setTodoItems(todoItems =>
      todoItems.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            name: name || todo.name,
            done: done !== undefined ? done : todo.done,
          };
        }
        return todo;
      })
    );
  };

  const createNewItem = ({ name }: { name: string }): void => {
    const newTodoItem: TodoItem = { name, id: uuid(), done: false };
    setTodoItems(todoItems => [newTodoItem, ...todoItems]);
  };

  const removeItem = ({ id }: { id: string }) => {
    setTodoItems(items => items.filter(item => item.id !== id));
  };

  const markAsDone = ({ id, done }: { id: string; done: boolean }) => {
    updateItem({ id, done });
  };

  return { todoItems, createNewItem, updateItem, markAsDone, removeItem };
};

export default useTodoItems;
