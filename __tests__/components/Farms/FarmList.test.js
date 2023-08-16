import { render, screen } from '@testing-library/react-native';
import FarmList from '../../../components/Farms/FarmList';
import { farm } from '../../../test-utils/data-factory';

describe('FarmList', () => {
  const farmsInfo = [farm(), farm(), farm()];

  it('should render a FarmCard for each farm', () => {
    render(<FarmList farms={farmsInfo} />);
    expect(screen.getByText(farmsInfo[0].farmName)).toBeTruthy();
    expect(screen.getByText(farmsInfo[1].farmName)).toBeTruthy();
    expect(screen.getByText(farmsInfo[2].farmName)).toBeTruthy();
  });
});
