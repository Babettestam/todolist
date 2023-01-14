import React, { ReactElement, useState, useEffect, createContext } from 'react';
import { ListItem } from 'types';
import { v4 as uuid } from 'uuid';

interface Props {
  children: ReactElement | ReactElement[];
}

export interface TodoListContextValues {
  lists: ListItem[];
  createNewList: ({ name }: { name: string }) => void;
}

const TodoListContext = createContext<TodoListContextValues>({
  lists: [],
  createNewList: () => console.warn('Provider not implemented'),
});
const TodoListProvider = ({ children }: Props) => {
  const [lists, setLists] = useState<ListItem[]>([]);

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
        createNewList,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export { TodoListProvider };

export default TodoListContext;
