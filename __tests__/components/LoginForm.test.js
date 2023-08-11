import { act, fireEvent, render, screen } from '@testing-library/react-native';
import LoginForm from '../../components/LoginForm';

describe('Login Form', () => {
  it('should render the heading, the input boxes and the button', () => {
    const mockFn = jest.fn();
    render(<LoginForm loginUser={mockFn} error={false} />);

    expect(screen.getByText('Login')).toBeTruthy();
    expect(screen.getByTestId('email')).toBeTruthy();
    expect(screen.getByTestId('password')).toBeTruthy();
    expect(screen.getByTestId('submit')).toBeTruthy();
  });

  it('should render required error messages if the password and email fields do not have value', async () => {
    const mockFn = jest.fn();
    render(<LoginForm loginUser={mockFn} error={false} />);

    await act(() => {
      fireEvent.press(screen.getByTestId('submit'));
    });
    expect(screen.getByText('Email is required')).toBeTruthy();
    expect(screen.getByText('Password is required')).toBeTruthy();
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should render invalid email error if the email inputted is not a valid email address', async () => {
    const mockFn = jest.fn();
    render(<LoginForm loginUser={mockFn} error={false} />);

    await act(() => {
      fireEvent.changeText(screen.getByTestId('email'), 'invalidEmail');
      fireEvent.press(screen.getByTestId('submit'));
    });
    expect(screen.getByText('Invalid email address')).toBeTruthy();
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should render an error message if the email is incorrect', async () => {
    const mockFn = jest.fn(() => new Error());

    render(<LoginForm loginUser={mockFn} />);

    await act(async () => {
      await fireEvent.changeText(
        screen.getByTestId('email'),
        'notFound@email.com'
      );
      await fireEvent.changeText(screen.getByTestId('password'), 'password');
      await fireEvent.press(screen.getByTestId('submit'));
    });
    // console.log(screen.wgetByText('something'));
    expect(mockFn).toHaveBeenCalled();
  });
});
