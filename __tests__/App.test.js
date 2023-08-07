import { render, screen } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders the App component', () => {
    render(<App />);
    const text = screen.getByText(
      'Open up App.js to start working on your app!'
    );
    expect(text).toBeTruthy();
  });
});
