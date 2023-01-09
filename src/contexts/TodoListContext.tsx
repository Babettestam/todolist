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
}

const TodoListContext = createContext<TodoListContextValues>({
  lists: [],
  todoItems: [],
  createNewItem: () => console.warn('Provider not implemented'),
  createNewList: () => console.warn('Provider not implemented'),
});

const TodoListProvider = ({ children }: Props) => {
  const [lists, setLists] = useState<ListItem[]>([]);
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  const createNewItem = ({ name, listId }: { name: string; listId: ListItem['id'] }) => {
    const newTodoItem: TodoItem = { name, id: uuid(), listId };
    setTodoItems(items => [newTodoItem, ...items]);
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
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export { TodoListProvider };

export default TodoListContext;
