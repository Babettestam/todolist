import TodoItemInput from 'components/TodoItem/TodoItemInput/TodoItemInput';
import React, { useState } from 'react';
import styles from './TodoItem.module.css';
import { ReactComponent as Close } from 'assets/icons/close.svg';
import { ReactComponent as Pen } from 'assets/icons/pen.svg';
import { ReactComponent as ChevronDown } from 'assets/icons/chevronDown.svg';
import { ReactComponent as ChevronUp } from 'assets/icons/chevronUp.svg';

interface Props {
  name: string;
  done: boolean;
  onChange: (name: string) => void;
  onRemove: () => void;
  markAsDone: () => void;
  moveDown: () => void;
  moveUp: () => void;
}

const TodoItem: React.FC<Props> = ({
  name,
  done,
  onChange,
  onRemove,
  markAsDone,
  moveDown,
  moveUp,
}) => {
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
      <span
        onClick={markAsDone}
        className={`${styles.name} ${done && styles.stripedThrough}`}
        data-testid="todo-item-name"
      >
        {name}
      </span>
      <div>
        <button onClick={moveDown} title="Move down" className={styles.iconButton}>
          <ChevronDown className={styles.icon} />
        </button>
        <button onClick={moveUp} title="Move up" className={styles.iconButton}>
          <ChevronUp className={styles.icon} />
        </button>
        <button
          onClick={() => setEditMode(true)}
          title="Edit"
          className={styles.iconButton}
          data-testid="todo-item-edit"
        >
          <Pen className={styles.icon} />
        </button>
        <button
          onClick={onRemove}
          title="Remove"
          className={styles.iconButton}
          data-testid="todo-item-remove"
        >
          <Close className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
