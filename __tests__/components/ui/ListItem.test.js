import { render, screen } from '@testing-library/react-native';
import ListItem from '../../../components/ui/ListItem';

describe('ListItem', () => {
  const setup = (bottomBorder = true) => {
    render(
      <ListItem
        icon="tractor-variant"
        label="Farm Name"
        iconLibrary="MaterialCommunityIcons"
        bottomBorder={bottomBorder}
        children="The Farm"
      />
    );
  };

  it('should render an icon, a label and the text with a bottom border when bottom border is true', () => {
    setup();
    const icon = screen.getByTestId('icon');

    expect(icon).toBeTruthy();
    expect(screen.getByText('Farm Name')).toBeTruthy();
    expect(screen.getByText('The Farm')).toBeTruthy();
    expect(
      screen.getByTestId('Farm Name-container').props.style.borderBottomWidth
    ).toEqual(1);
  });

  it('should not show a bottom border when bottom border is false', () => {
    setup(false);

    expect(
      screen.getByTestId('Farm Name-container').props.style.borderBottomWidth
    ).toBeFalsy();
  });
});
