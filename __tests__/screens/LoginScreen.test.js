import { screen } from '@testing-library/react-native';
import { Alert } from 'react-native';
import LoginScreen from '../../screens/LoginScreen';
import { renderWithProviders } from '../../utils/utilsForTests';

describe('Login Screen', () => {
  it('should render', () => {
    renderWithProviders(<LoginScreen />);

    expect(screen.getByText('Login')).toBeTruthy();
  });

  it('should show an alert if the is an error with the email or password', async () => {
    Alert.alert = jest.fn();

    renderWithProviders(<LoginScreen />, {
      preloadedState: {
        authState: {
          token: null,
          loading: false,
          errorMessage: 'There is an error',
          loggedInUser: null,
        },
      },
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'There is an error',
      'The email or password you entered was incorrect. Please try again.'
    );
  });
});
