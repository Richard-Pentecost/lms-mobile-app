import { fireEvent, render, screen } from '@testing-library/react-native';
import FarmCard from '../../../components/Farms/FarmCard';
import { farm } from '../../../test-utils/data-factory';

describe('FarmCard', () => {
  const mockFn = jest.fn();
  const farmInfo = farm();

  beforeEach(() => {
    render(
      <FarmCard
        farmName={farmInfo.farmName}
        postcode={farmInfo.postcode}
        contactName={farmInfo.contactName}
        contactNumber={farmInfo.contactNumber}
        onPress={mockFn}
      />
    );
  });

  it('should render farm details', () => {
    expect(screen.getByText(farmInfo.farmName)).toBeTruthy();
    expect(screen.getByText(farmInfo.postcode)).toBeTruthy();
    expect(screen.getByText(farmInfo.contactName)).toBeTruthy();
    expect(screen.getByText(farmInfo.contactNumber)).toBeTruthy();
  });

  it('should call the onPress function when the card is pressed', () => {
    fireEvent.press(screen.getByTestId('button'));

    expect(mockFn).toHaveBeenCalled();
  });
});
