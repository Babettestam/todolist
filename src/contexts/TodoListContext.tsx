import React, { ReactElement, useState, createContext } from 'react';
import { ListItem } from 'types';
import { v4 as uuid } from 'uuid';

interface Props {
  children: ReactElement | ReactElement[];
}

export interface TodoListContextValues {
  lists: ListItem[];
  createNewList: ({ name }: { name?: string }) => void;
  handleChangeName: ({ id, name }: { id: string; name: string }) => void;
  handleRemoveList: ({ id }: { id: string }) => void;
}

const TodoListContext = createContext<TodoListContextValues>({
  lists: [],
  createNewList: () => console.warn('Provider not implemented'),
  handleChangeName: () => console.warn('Provider not implemented'),
  handleRemoveList: () => console.warn('Provider not implemented'),
});
const TodoListProvider = ({ children }: Props) => {
  const [lists, setLists] = useState<ListItem[]>([{ name: '', id: uuid() }]);

  const createNewList = ({ name = '' }: { name?: string }) => {
    const newList: ListItem = { name, id: uuid() };
    setLists(currentLists => [...currentLists, newList]);
  };

  const handleChangeName = ({ id, name = '' }: { id: string; name: string }) => {
    setLists(currentLists =>
      currentLists.map(list => {
        if (list.id === id) {
          return {
            ...list,
            name,
          };
        }
        return list;
      })
    );
  };

  const handleRemoveList = ({ id }: { id: string }) => {
    if (confirm('Are you sure you want to remove the list including all todo items?')) {
      setLists(currentLists => currentLists.filter(list => list.id !== id));
    }
  };

  return (
    <TodoListContext.Provider
      value={{
        lists,
        createNewList,
        handleChangeName,
        handleRemoveList,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export { TodoListProvider };

export default TodoListContext;
