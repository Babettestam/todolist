import React from 'react';
import styles from './TodoItem.module.css';

interface Props {
  name: string;
}

const TodoItem: React.FC<Props> = ({ name }) => <div className={styles.item}>{name}</div>;

export default TodoItem;
