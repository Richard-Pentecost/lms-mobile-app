import { act, fireEvent, screen } from '@testing-library/react-native';
import LoginForm from '../../components/LoginForm';
import { renderWithProviders } from '../../utils/utilsForTests';

describe('Login Form', () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    renderWithProviders(<LoginForm loginUser={mockFn} />);
  });

  it('should render the heading, the input boxes and the button', () => {
    expect(screen.getByText('Login')).toBeTruthy();
    expect(screen.getByTestId('email')).toBeTruthy();
    expect(screen.getByTestId('password')).toBeTruthy();
    expect(screen.getByTestId('submit')).toBeTruthy();
  });

  it('should render required error messages if the password and email fields do not have value', async () => {
    await act(() => {
      fireEvent.press(screen.getByTestId('submit'));
    });

    expect(screen.getByText('Email is required')).toBeTruthy();
    expect(screen.getByText('Password is required')).toBeTruthy();
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should render invalid email error if the email inputted is not a valid email address', async () => {
    await act(async () => {
      await fireEvent.changeText(screen.getByTestId('email'), 'invalidEmail');
      await fireEvent.changeText(screen.getByTestId('password'), 'password');
      fireEvent.press(screen.getByTestId('submit'));
    });

    expect(screen.getByText('Invalid email address')).toBeTruthy();
    expect(screen.queryByText('Email is required')).toBeFalsy();
    expect(screen.queryByText('Password is required')).toBeFalsy();
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should call the loginUser function with the email and password if there are no validation errors', async () => {
    await act(async () => {
      await fireEvent.changeText(
        screen.getByTestId('email'),
        'valid@email.com'
      );
      await fireEvent.changeText(screen.getByTestId('password'), 'password');
      fireEvent.press(screen.getByTestId('submit'));
    });

    expect(mockFn).toHaveBeenCalledWith({
      email: 'valid@email.com',
      password: 'password',
    });
  });
});
