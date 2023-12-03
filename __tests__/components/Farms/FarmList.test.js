import { screen } from '@testing-library/react-native';
import FarmList from '../../../components/Farms/FarmList';
import { farm } from '../../../test-utils/data-factory';
import { renderWithProviders } from '../../../test-utils/test-redux-store';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('FarmList', () => {
  const farmsInfo = [farm(), farm(), farm()];

  it('should render a FarmCard for each farm', () => {
    renderWithProviders(<FarmList farms={farmsInfo} />);
    expect(screen.getByText(farmsInfo[0].farmName)).toBeTruthy();
    expect(screen.getByText(farmsInfo[1].farmName)).toBeTruthy();
    expect(screen.getByText(farmsInfo[2].farmName)).toBeTruthy();
  });
});
