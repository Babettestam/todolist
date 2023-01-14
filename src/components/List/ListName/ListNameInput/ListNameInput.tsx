import React, { useState } from 'react';
import styles from './ListNameInput.module.css';

interface Props {
  initialValue: string;
  onChangeName: ({ name }: { name: string }) => void;
}

const ListNameInput: React.FC<Props> = ({ initialValue, onChangeName }) => {
  const [value, setValue] = useState<string>(initialValue);

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChangeName({ name: value });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          autoFocus
          className={styles.inputField}
          // Store value also on blur
          onBlur={() => onChangeName({ name: value })}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    </div>
  );
};

export default ListNameInput;
