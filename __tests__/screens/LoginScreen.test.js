import { screen } from '@testing-library/react-native';
import LoginScreen from '../../screens/LoginScreen';
import { renderWithProviders } from '../../utils/utilsForTests';

describe('Login Screen', () => {
  it('should render', () => {
    renderWithProviders(<LoginScreen />);

    expect(screen.getByText('Login')).toBeTruthy();
  });
});
