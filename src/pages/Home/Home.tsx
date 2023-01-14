import React from 'react';
import styles from 'pages/Home/Home.module.css';
import List from 'components/List/List';
import useTodoList from 'hooks/useTodoList';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';

const Home: React.FC = () => {
  const { lists, createNewList } = useTodoList();

  return (
    <div className={styles.listContainer}>
      {lists.map(({ name, id }) => (
        <List key={id} id={id} name={name} />
      ))}
      <button className={styles.plusIconButton} onClick={() => createNewList({})}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default Home;
