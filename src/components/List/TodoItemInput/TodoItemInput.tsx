import React, { ChangeEvent, useState } from 'react';
import styles from './TodoItemInput.module.css';

interface Props {
  onSubmit: (name: string) => void;
  initialValue?: string;
  autoFocus?: boolean;
}

const TodoItemInput: React.FC<Props> = ({ onSubmit, initialValue = '', autoFocus }) => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSaveValue();
  };

  const handleSaveValue = () => {
    if (value) {
      setValue('');
      onSubmit(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onBlur={handleSaveValue}
        className={styles.itemInput}
        placeholder="add a new item"
        autoFocus={autoFocus}
        data-testid="todo-item-input"
      />
    </form>
  );
};

export default TodoItemInput;
