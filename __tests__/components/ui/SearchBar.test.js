import { act, fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import SearchBar from '../../../components/ui/SearchBar';

describe('SearchBar', () => {
  let mockFn;
  const setup = (searchValue = '') => {
    mockFn = jest.fn();
    render(<SearchBar searchValue={searchValue} setSearchValue={mockFn} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the search bar with the search icon and not the clear or cancel button', () => {
    setup();
    expect(screen.getByTestId('search-bar')).toBeTruthy();
    expect(screen.getByTestId('search-icon')).toBeTruthy();
    expect(screen.queryByTestId('clear-button')).toBeFalsy();
    expect(screen.queryByText('Cancel')).toBeFalsy();
  });

  it('should render the cancel button when the search input is selected', async () => {
    setup();
    await act(async () => {
      await screen.getByTestId('search-bar').props.onFocus();
    });
    expect(screen.getByText('Cancel')).toBeTruthy();
    expect(screen.queryByTestId('clear-button')).toBeFalsy();
  });

  it('should render the clear button once there is a search value in the search bar', async () => {
    setup('a');
    await act(async () => {
      await screen.getByTestId('search-bar').props.onFocus();
    });
    expect(screen.getByTestId('clear-button')).toBeTruthy();
  });

  it('should call set the search value to an empty string when the clear button is pressed', async () => {
    setup('a');
    await act(async () => {
      await screen.getByTestId('search-bar').props.onFocus();
      await fireEvent.press(screen.getByTestId('clear-button'));
    });
    expect(mockFn).toHaveBeenCalledWith('');
  });

  it('should call set the search value to an empty string when the cancel button is pressed and hide the cancel button', async () => {
    setup('a');
    await act(async () => {
      await screen.getByTestId('search-bar').props.onFocus();
      await fireEvent.press(screen.getByText('Cancel'));
    });
    expect(mockFn).toHaveBeenCalledWith('');
    expect(screen.queryByText('Cancel')).toBeFalsy();
  });
});
