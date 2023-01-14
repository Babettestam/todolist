import React from 'react';
import { render, screen } from '@testing-library/react';
import List from 'components/List/List';

const listName = 'test';

jest.mock('hooks/useTodoList', () => ({
  useTodoList: {
    todoItems: [],
    createNewItem: jest.fn(),
  },
}));

describe('List test', () => {
  beforeEach(() => {
    render(<List name={listName} />);
  });

  it('show list name', () => {
    const heading = screen.getByRole('heading', { level: 3 });

    expect(heading).toContainHTML(listName);
  });
});

export {};
