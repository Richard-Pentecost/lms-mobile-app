import { render, screen } from '@testing-library/react-native';
import Header from '../../../components/ui/Header';

describe('Header', () => {
  it('should render the Header component with the correct text', () => {
    render(<Header children="Heading" />);

    expect(screen.getByText('Heading')).toBeTruthy();
  });
});
