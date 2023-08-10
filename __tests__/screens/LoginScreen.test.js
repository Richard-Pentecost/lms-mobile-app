import { render, screen } from '@testing-library/react-native';
import LoginScreen from '../../screens/LoginScreen';

describe('Login Screen', () => {
  it('should render', () => {
    render(<LoginScreen />);

    expect(screen.getByText('Login')).toBeTruthy();
  });
});
