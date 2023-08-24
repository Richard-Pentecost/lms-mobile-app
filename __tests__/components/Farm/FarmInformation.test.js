import { render, screen } from '@testing-library/react-native';
import FarmInformation from '../../../components/Farm/FarmInformation';
import { farm } from '../../../test-utils/data-factory';

describe('FarmInformation', () => {
  let farmInfo;
  const setup = (farmOptions = {}) => {
    farmInfo = farm(farmOptions);
    render(<FarmInformation farm={farmInfo} />);
  };

  it('should render a cards with farm information, other information and products on when the farm has all the information', () => {
    setup({ comments: 'some comment', accessCodes: 'Code' });

    expect(screen.getByTestId('farm-info-card')).toBeTruthy();
    expect(screen.getByTestId('other-information-card')).toBeTruthy();
    expect(screen.getByTestId('products-card')).toBeTruthy();
  });

  it('should not render the other information card when there are no comments or access codes in the farm information', () => {
    setup();

    expect(screen.queryByTestId('other-information-card')).toBeFalsy();
    expect(screen.getByTestId('farm-info-card')).toBeTruthy();
    expect(screen.getByTestId('products-card')).toBeTruthy();
  });

  describe('farm-info-card', () => {
    it('should render farm name, postcode, contact name, contact number and region when the farm has all the information', () => {
      setup({ region: true });
      const { farmName, postcode, contactName, contactNumber, region } =
        farmInfo;
      expect(screen.getByText(farmName)).toBeTruthy();
      expect(screen.getByText(postcode)).toBeTruthy();
      expect(screen.getByText(contactName)).toBeTruthy();
      expect(screen.getByText(contactNumber)).toBeTruthy();
      expect(screen.getByText('Region')).toBeTruthy();
    });

    it('should render farm name, postcode, contact name, contact number but not the region when the farm has no region', () => {
      setup();
      const { farmName, postcode, contactName, contactNumber } = farmInfo;

      expect(screen.queryByText('Region')).toBeFalsy();
      expect(screen.getByText(farmName)).toBeTruthy();
      expect(screen.getByText(postcode)).toBeTruthy();
      expect(screen.getByText(contactName)).toBeTruthy();
      expect(screen.getByText(contactNumber)).toBeTruthy();
    });

    it('should render the bottom border on contact number when there is region information', () => {
      setup({ region: true });

      expect(
        screen.getByTestId('Contact Number-container').props.style
          .borderBottomWidth
      ).toEqual(1);
    });

    it('should not render the bottom border on contact number when there is no region information', () => {
      setup();

      expect(
        screen.getByTestId('Contact Number-container').props.style
          .borderBottomWidth
      ).toBeFalsy();
    });
  });

  describe('comments-and-access-codes-card', () => {
    it('should show the comments and access codes when present in the farm information', () => {
      setup({ comments: 'some comment', accessCodes: 'Code' });

      expect(screen.getByText('Code')).toBeTruthy();
      expect(screen.getByText('some comment')).toBeTruthy();
      expect(
        screen.getByTestId('Access Codes-container').props.style
          .borderBottomWidth
      ).toEqual(1);
    });

    it('should show the access codes and not the comments when there are access codes but not comments in the farm information', () => {
      setup({ accessCodes: 'Code' });

      expect(screen.getByText('Code')).toBeTruthy();
      expect(screen.queryByText('Comments')).toBeFalsy();
      expect(
        screen.getByTestId('Access Codes-container').props.style
          .borderBottomWidth
      ).toBeFalsy();
    });

    it('should show the comments and not the access codes when there are comments but not access codes in the farm information', () => {
      setup({ comments: 'some comment' });

      expect(screen.getByText('some comment')).toBeTruthy();
      expect(screen.queryByText('Access Codes')).toBeFalsy();
    });
  });

  describe('products-card', () => {
    it('should render all of the products in the farm information', () => {
      setup();

      farmInfo.products.map((product) => {
        expect(screen.getByText(product.productName)).toBeTruthy();
      });
    });

    it('should not render the bottom border for the last product displayed', () => {
      setup();

      const noOfProducts = farmInfo.products.length;
      expect(
        screen.getByTestId(`Product ${noOfProducts}-container`).props.style
          .borderBottomWidth
      ).toBeFalsy();
    });
  });
});
