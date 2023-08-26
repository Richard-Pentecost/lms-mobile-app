import { render, screen } from '@testing-library/react-native';
import Table from '../../../components/Farm/Table';
import { fullData } from '../../../test-utils/data-factory';

describe('Table', () => {
  const farmData = [fullData(), fullData(), fullData()];
  beforeEach(() => {
    render(<Table data={farmData} />);
  });

  it('should render the table with column headings', () => {
    expect(screen.getByText('Date')).toBeTruthy();
    expect(screen.getByText('Product')).toBeTruthy();
    expect(screen.getByText('Cows')).toBeTruthy();
    expect(screen.getByText('Quantity')).toBeTruthy();
    expect(screen.getByText('Meter')).toBeTruthy();
    expect(screen.getByText('Water usage')).toBeTruthy();
    expect(screen.getByText('Water intake')).toBeTruthy();
    expect(screen.getByText('Pump')).toBeTruthy();
    expect(screen.getByText('Before float')).toBeTruthy();
    expect(screen.getByText('kg actual')).toBeTruthy();
    expect(screen.getByText('Target feed')).toBeTruthy();
    expect(screen.getByText('Actual feed')).toBeTruthy();
    expect(screen.getByText('Next delivery')).toBeTruthy();
    expect(screen.getByText('Comments')).toBeTruthy();
  });

  it('should render a row for each set of data', () => {
    expect(screen.getByTestId('Row-0')).toBeTruthy();
    expect(screen.getByTestId('Row-1')).toBeTruthy();
    expect(screen.getByTestId('Row-2')).toBeTruthy();
  });
});
