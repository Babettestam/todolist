import React, { useState } from 'react';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';

interface Props {
  createNewList: ({ name }: { name: string }) => void;
}

const CreateListInput: React.FC<Props> = ({ createNewList }) => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState<string>('');
  const toggleActive = () => setIsActive(current => !current);

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue('');
    createNewList({ name: value });
  };

  return (
    <div>
      <PlusIcon onClick={toggleActive} />
      {isActive && (
        <form onSubmit={onSubmit}>
          <input onBlur={toggleActive} value={value} onChange={e => setValue(e.target.value)} />
        </form>
      )}
    </div>
  );
};

export default CreateListInput;
