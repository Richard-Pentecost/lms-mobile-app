import { render, screen } from '@testing-library/react-native';
import FarmCardDetail from '../../../components/Farms/FarmCardDetail';

describe('FarmDetailsCard', () => {
  beforeEach(() => {
    render(
      <FarmCardDetail
        children="text for rendering"
        icon="user"
        iconLibrary="feather"
      />
    );
  });

  it('should render the icon passed to the component', () => {
    expect(screen.getByTestId('icon')).toBeTruthy();
  });

  it('should render the text passed to the component', () => {
    expect(screen.getByText('text for rendering')).toBeTruthy();
  });
});
