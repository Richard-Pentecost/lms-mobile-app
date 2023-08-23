import { fireEvent, render, screen } from '@testing-library/react-native';
import IconButton from '../../../components/ui/IconButton';

describe('IconButton', () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    render(
      <IconButton icon="sign-out" color="green" size={24} onPress={mockFn} />
    );
  });

  it('should render an icon with the correct colour and font size', () => {
    const icon = screen.getByTestId('icon');
    expect(icon).toBeTruthy();
    expect(icon.props.style[0]).toEqual({ fontSize: 24, color: 'green' });
  });

  it('should call the onPress function when clicked', () => {
    fireEvent.press(screen.getByTestId('icon-button'));
    expect(mockFn).toHaveBeenCalled();
  });
});
