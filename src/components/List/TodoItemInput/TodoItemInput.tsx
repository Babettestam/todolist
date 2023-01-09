import React, { ChangeEvent, useState } from 'react';
import styles from './TodoItemInput.module.css';

interface Props {
  createNewItem: (name: string) => void;
}

const TodoItemInput: React.FC<Props> = ({ createNewItem }) => {
  const [value, setValue] = useState<string>('');

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue('');
    createNewItem(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={styles.itemInput}
        placeholder="add a new item"
      />
    </form>
  );
};

export default TodoItemInput;
