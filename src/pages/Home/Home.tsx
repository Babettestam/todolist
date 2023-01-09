import React from 'react';
import styles from 'pages/Home/Home.module.css';
import List from 'components/List/List';
import useTodoList from 'hooks/useTodoList';
import CreateListInput from 'components/CreateListInput/CreateListInput';

const Home: React.FC = () => {
  const { lists, createNewList } = useTodoList();

  return (
    <div className={styles.ListContainer}>
      {lists.map(({ name, id }) => (
        <List key={id} id={id} name={name} />
      ))}
      <CreateListInput createNewList={createNewList} />
    </div>
  );
};

export default Home;
