import { fireEvent, render, screen } from '@testing-library/react-native';
import FilterSortPanel from '../../../components/ui/FilterSortPanel';
import { region } from '../../../test-utils/data-factory';

describe('FilterSortPanel', () => {
  const regions = [region('North West'), region('South East'), region('Wales')];
  let mockFn;
  const setup = (selectedRegion = null) => {
    mockFn = jest.fn();
    render(
      <FilterSortPanel
        regions={regions}
        region={selectedRegion}
        setRegion={mockFn}
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the filter button with the correct text and icon', () => {
    setup();

    expect(screen.getByText('Filter')).toBeTruthy();
    expect(screen.getByTestId('caret-down-icon')).toBeTruthy();
    expect(screen.queryByText('Clear filter')).toBeFalsy();
  });

  it('should show correct text, remove the icon and show the clear filter button when there is a region selected', () => {
    setup('North West');

    expect(screen.getByText('Filtering by North West region')).toBeTruthy();
    expect(screen.getByText('Clear filter')).toBeTruthy();
    expect(screen.queryByTestId('caret-down-icon')).toBeFalsy();
  });

  it('should call setRegion with a blank string when the clear filter button is pressed', () => {
    setup('North West');

    fireEvent.press(screen.getByText('Clear filter'));
    expect(mockFn).toHaveBeenCalledWith('');
  });

  // it('should show the dropdown when the filter button is pressed', async () => {
  //   await setup();

  //   const dropdown = screen.getByTestId('dropdown');
  //   expect(dropdown.props.visible).toEqual(false);

  //   await waitFor(() => {
  //     fireEvent.press(screen.getByText('Filter'));
  //     expect(dropdown.props.visible).toEqual(true);
  //   });

  //   expect(screen.getAllByTestId('dropdown-option').length).toEqual(3);
  // });

  // it('should call setRegion with the region name when a region is selected from the dropdown', async () => {
  //   setup();

  //   await fireEvent.press(screen.getByText('Filter'));
  //   await fireEvent.press(screen.getByText('North West'));

  //   expect(mockFn).toHaveBeenCalledWith('North West');
  // });
});
