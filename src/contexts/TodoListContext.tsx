import React, { ReactElement, useState, useEffect, createContext } from 'react';
import { ListItem, TodoItem } from 'types';
import { v4 as uuid } from 'uuid';

interface Props {
  children: ReactElement | ReactElement[];
}

export interface TodoListContextValues {
  lists: ListItem[];
  todoItems: TodoItem[];
  createNewItem: ({ name, listId }: { name: string; listId: ListItem['id'] }) => void;
  createNewList: ({ name }: { name: string }) => void;
  updateItem: ({ name, id }: { name: string; id: string }) => void;
  removeItem: ({ id }: { id: string }) => void;
  markAsDone: ({ id, done }: { id: string; done: boolean }) => void;
}

const TodoListContext = createContext<TodoListContextValues>({
  lists: [],
  todoItems: [],
  createNewItem: () => console.warn('Provider not implemented'),
  createNewList: () => console.warn('Provider not implemented'),
  updateItem: () => console.warn('Provider not implemented'),
  removeItem: () => console.warn('Provider not implemented'),
  markAsDone: () => console.warn('Provider not implemented'),
});
const TodoListProvider = ({ children }: Props) => {
  const [lists, setLists] = useState<ListItem[]>([]);
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  const createNewItem = ({ name, listId }: { name: string; listId: ListItem['id'] }) => {
    const newTodoItem: TodoItem = { name, id: uuid(), listId, done: false };
    setTodoItems(items => [newTodoItem, ...items]);
  };

  const updateItem = ({ id, name, done }: { id: string; name?: string; done?: boolean }) => {
    setTodoItems(items =>
      items.map(item => {
        if (item.id === id) {
          console.log('name', name, name || item.name);
          return {
            ...item,
            name: name || item.name,
            done: done !== undefined ? done : item.done,
          };
        }
        return item;
      })
    );
  };

  const removeItem = ({ id }: { id: string }) => {
    setTodoItems(items => items.filter(item => item.id !== id));
  };

  const markAsDone = ({ id, done }: { id: string; done: boolean }) => {
    updateItem({ id, done });
  };

  const createNewList = ({ name }: { name: string }) => {
    const newList: ListItem = { name, id: uuid() };
    setLists(currentLists => [...currentLists, newList]);
  };

  useEffect(() => {
    // Add initial item if the list is empty
    if (!lists.length) {
      createNewList({ name: 'backlog' });
    }
  }, []);

  return (
    <TodoListContext.Provider
      value={{
        lists,
        todoItems,
        createNewItem,
        createNewList,
        updateItem,
        removeItem,
        markAsDone,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export { TodoListProvider };

export default TodoListContext;
