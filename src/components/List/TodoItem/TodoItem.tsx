import TodoItemInput from 'components/List/TodoItemInput/TodoItemInput';
import React, { useState } from 'react';
import styles from './TodoItem.module.css';
import { ReactComponent as Close } from 'assets/icons/close.svg';
import { ReactComponent as Pen } from 'assets/icons/pen.svg';

interface Props {
  name: string;
  done: boolean;
  onChange: (name: string) => void;
  onRemove: () => void;
  markAsDone: () => void;
}

const TodoItem: React.FC<Props> = ({ name, done, onChange, onRemove, markAsDone }) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const onSubmitChange = (newName: string) => {
    setEditMode(false);
    onChange(newName);
  };

  if (editMode) {
    return <TodoItemInput autoFocus onSubmit={onSubmitChange} initialValue={name} />;
  }

  return (
    <div className={styles.item}>
      <span onClick={markAsDone} className={`${styles.name} ${done && styles.stripedThrough}`}>
        {name}
      </span>
      <div>
        <button onClick={() => setEditMode(true)} title="Edit" className={styles.iconButton}>
          <Pen className={styles.icon} />
        </button>
        <button onClick={onRemove} title="Remove" className={styles.iconButton}>
          <Close className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
