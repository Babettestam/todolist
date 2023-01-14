import { useState } from 'react';
import { TodoItem } from 'types';
import { v4 as uuid } from 'uuid';
import { arrayMoveImmutable } from 'array-move';
import useLocalStorage from 'hooks/useLocalStorage';

const useTodoItems = ({ listId }: { listId: string }) => {
  const [todoItems, setTodoItems] = useLocalStorage<TodoItem[]>(`TODO_${listId}`, []);

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

  const moveItemDown = ({ id }: { id: string }) => moveItem('DOWN', id);
  const moveItemUp = ({ id }: { id: string }) => moveItem('UP', id);

  const moveItem = (direction: 'UP' | 'DOWN', id: string) => {
    const currentIndex = todoItems.findIndex(todo => todo.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'UP' ? currentIndex - 1 : currentIndex + 1;
    setTodoItems(todoItems => arrayMoveImmutable(todoItems, currentIndex, newIndex));
  };

  return { todoItems, createNewItem, updateItem, markAsDone, removeItem, moveItemDown, moveItemUp };
};

export default useTodoItems;
