import ListNameInput from 'components/List/ListName/ListNameInput/ListNameInput';
import useTodoList from 'hooks/useTodoList';
import React, { useState } from 'react';
import listStyles from './ListName.module.css';

interface Props {
  name: string;
  id: string;
}

const ListName: React.FC<Props> = ({ name, id }) => {
  const { handleChangeName } = useTodoList();
  const [editIsActive, setEditIsActive] = useState<boolean>(true);
  const toggleEditMode = () => setEditIsActive(current => !current);

  const onNameChange = ({ name }: { name: string }) => {
    setEditIsActive(false);
    handleChangeName({ name, id });
  };

  return (
    <React.Fragment>
      {editIsActive ? (
        <ListNameInput onChangeName={onNameChange} initialValue={name} />
      ) : (
        <h3 onClick={toggleEditMode} className={listStyles.header}>
          {name}
        </h3>
      )}
    </React.Fragment>
  );
};

export default ListName;
