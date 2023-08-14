import { act, fireEvent, screen } from '@testing-library/react-native';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Alert } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import LoginScreen from '../../screens/LoginScreen';
import { renderWithProviders } from '../../utils/utilsForTests';

export const handlers = [
  rest.post(`${API_URL}/login`, (_req, res, ctx) => {
    return res(ctx.status(401), ctx.json({ error: 'Incorrect email ' }));
  }),
];

const server = setupServer(...handlers);

describe('Login Screen', () => {
  beforeEach(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

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

  describe('Integration test for login failure when the password or email is not correct', () => {
    it('shows an alert when the email or password is incorrect', async () => {
      Alert.alert = jest.fn();

      renderWithProviders(<LoginScreen />);

      await act(async () => {
        await fireEvent.changeText(
          screen.getByTestId('email'),
          'invalid@email.com'
        );
        await fireEvent.changeText(screen.getByTestId('password'), 'password');
        fireEvent.press(screen.getByTestId('submit'));
      });
      expect(Alert.alert).toHaveBeenCalledWith(
        'Incorrect Login Details',
        'The email or password you entered was incorrect. Please try again.'
      );
    });
  });
});
