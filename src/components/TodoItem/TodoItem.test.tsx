import React from 'react';
import { screen, render, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from './TodoItem';

const mockMarkAsDone = jest.fn();
const mockOnChange = jest.fn();
const mockOnRemove = jest.fn();
const mockMoveDown = jest.fn();
const mockMoveUp = jest.fn();

describe('TodoItem test', () => {
  beforeEach(() => {
    render(
      <TodoItem
        name="test"
        done={false}
        markAsDone={mockMarkAsDone}
        onChange={mockOnChange}
        onRemove={mockOnRemove}
        moveDown={mockMoveDown}
        moveUp={mockMoveUp}
      />
    );
  });

  it('on click edit, activate edit mode', () => {
    activateEdit();

    const input = screen.getByTestId('todo-item-input');
    expect(input).toBeVisible();
  });

  it('on submit change trigger disable edit mode and trigger onChange', () => {
    activateEdit();

    const input = screen.getByTestId('todo-item-input');

    // Change value and blur input
    fireEvent.change(input, { target: { value: 'changed' } });
    fireEvent.blur(input);

    expect(mockOnChange).toBeCalledWith('changed');
  });

  it('on name click mark as done', () => {
    const todoItemName = screen.getByTestId('todo-item-name');
    userEvent.click(todoItemName);
    expect(mockMarkAsDone).toBeCalled();
  });

  it('on remove click trigger onRemove', () => {
    const trigger = screen.getByTestId('todo-item-name');
    userEvent.hover(trigger);

    const removeButton = screen.getByTestId('todo-item-remove');

    act(() => {
      userEvent.click(removeButton);
    });

    expect(mockOnRemove).toBeCalled();
  });
});

export {};

function activateEdit() {
  const trigger = screen.getByTestId('todo-item-name');
  userEvent.hover(trigger);

  const editButton = screen.getByTestId('todo-item-edit');

  act(() => {
    userEvent.click(editButton);
  });
}
