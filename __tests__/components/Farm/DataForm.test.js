import { act, fireEvent, render, screen } from '@testing-library/react-native';
import dayjs from 'dayjs';
import DataForm from '../../../components/Farm/DataForm';
import { product } from '../../../test-utils/data-factory';

describe('DataForm', () => {
  let mockFn;
  const products = [product(), product()];

  const setup = (data = null) => {
    mockFn = jest.fn();
    render(<DataForm products={products} handleSubmit={mockFn} data={data} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render all form inputs', () => {
    setup();

    expect(screen.getByText('Date')).toBeTruthy();
    expect(screen.getByText('Product')).toBeTruthy();
    expect(screen.getByText('Number of cows')).toBeTruthy();
    expect(screen.getByText('Quantity')).toBeTruthy();
    expect(screen.getByText('Meter reading')).toBeTruthy();
    expect(screen.getByText('Water usage')).toBeTruthy();
    expect(screen.getByText('Pump dial')).toBeTruthy();
    expect(screen.getByText('Float before delivery')).toBeTruthy();
    expect(screen.getByText('Target feed rate')).toBeTruthy();
    expect(screen.getByText('Float after delivery')).toBeTruthy();
    expect(screen.getByText('Comments')).toBeTruthy();
  });

  describe('adding data', () => {
    it('should render the button with the Add data text', () => {
      setup();

      expect(screen.getByText('Add data')).toBeTruthy();
      expect(screen.queryByText('Update data')).toBeFalsy();
    });

    it('should submit the form when all the mandatory fields have been filled out', async () => {
      setup();

      await act(async () => {
        const select = screen.getByTestId('dropdown').children[0];
        await fireEvent(select, 'onSelect', products[0].productName);

        await fireEvent.changeText(screen.getByTestId('noOfCows-input'), '10');
        await fireEvent.changeText(screen.getByTestId('quantity-input'), '10');
        await fireEvent.changeText(
          screen.getByTestId('meterReading-input'),
          '10'
        );
        await fireEvent.changeText(
          screen.getByTestId('waterUsage-input'),
          '10'
        );
        await fireEvent.changeText(screen.getByTestId('pumpDial-input'), '10');
        await fireEvent.changeText(
          screen.getByTestId('floatBeforeDelivery-input'),
          '10'
        );
        await fireEvent.changeText(
          screen.getByTestId('targetFeedRate-input'),
          '10'
        );
        await fireEvent.changeText(
          screen.getByTestId('floatAfterDelivery-input'),
          '10'
        );
        await fireEvent.press(screen.getByText('Add data'));
      });

      expect(mockFn).toHaveBeenCalledWith({
        date: new Date(),
        product: products[0].productName,
        noOfCows: '10',
        quantity: '10',
        meterReading: '10',
        waterUsage: '10',
        pumpDial: '10',
        floatBeforeDelivery: '10',
        targetFeedRate: '10',
        floatAfterDelivery: '10',
        comments: '',
      });
    });
  });

  describe('updating data', () => {
    const data = {
      date: new Date('01/01/2020'),
      product: products[0].productName,
      noOfCows: '10',
      quantity: '10',
      meterReading: '10',
      waterUsage: '10',
      pumpDial: '10',
      floatBeforeDelivery: '10',
      targetFeedRate: '10',
      floatAfterDelivery: '10',
      comments: 'Here are some comments',
    };

    it('should render the button with the Update data text', () => {
      setup(data);

      expect(screen.getByText('Update data')).toBeTruthy();
      expect(screen.queryByText('Add data')).toBeFalsy();
    });

    it('should submit the form when all the mandatory fields have been filled out', async () => {
      setup(data);

      await act(async () => {
        await fireEvent(screen.getByTestId('datePicker'), 'onChange', {
          nativeEvent: { timestamp: new Date('02/01/2020') },
        });

        const select = screen.getByTestId('dropdown').children[0];
        await fireEvent(select, 'onSelect', products[1].productName);

        await fireEvent.changeText(screen.getByTestId('noOfCows-input'), '20');
        await fireEvent.changeText(screen.getByTestId('quantity-input'), '20');
        await fireEvent.changeText(
          screen.getByTestId('meterReading-input'),
          '20'
        );
        await fireEvent.changeText(
          screen.getByTestId('waterUsage-input'),
          '20'
        );
        await fireEvent.changeText(screen.getByTestId('pumpDial-input'), '20');
        await fireEvent.changeText(
          screen.getByTestId('floatBeforeDelivery-input'),
          '20'
        );
        await fireEvent.changeText(
          screen.getByTestId('targetFeedRate-input'),
          '20'
        );
        await fireEvent.changeText(
          screen.getByTestId('floatAfterDelivery-input'),
          '20'
        );
        await fireEvent.changeText(
          screen.getByTestId('comments-input'),
          'A new comment'
        );
        await fireEvent.press(screen.getByText('Update data'));
      });

      expect(mockFn).toHaveBeenCalledWith({
        date: new Date('02/01/2020'),
        product: products[1].productName,
        noOfCows: '20',
        quantity: '20',
        meterReading: '20',
        waterUsage: '20',
        pumpDial: '20',
        floatBeforeDelivery: '20',
        targetFeedRate: '20',
        floatAfterDelivery: '20',
        comments: 'A new comment',
      });
    });
  });

  describe('errors', () => {
    describe('Date errors', () => {
      it('should render an error if the date is in the future and submit function should not be called', async () => {
        setup();

        const futureDate = new Date(dayjs().add(1, 'day'));
        await act(async () => {
          await fireEvent(screen.getByTestId('datePicker'), 'onChange', {
            nativeEvent: { timestamp: futureDate },
          });
          await fireEvent.press(screen.getByText('Add data'));
        });

        expect(
          screen.getByText('The date cannot be in the future')
        ).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });
    });

    describe('Product errors', () => {
      it('should render an error if a product is not selected and submit function should not be called', async () => {
        setup();

        await act(() => {
          fireEvent.press(screen.getByText('Add data'));
        });
        expect(screen.getByText('A product is required')).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });
    });

    describe('Number of cows errors', () => {
      it('should render an error if the number of cows is blank and submit function should not be called', async () => {
        setup();

        await act(() => {
          fireEvent.press(screen.getByText('Add data'));
        });

        expect(screen.getByText('Number of cows is required')).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });

      it('should render an error if the number of cows is 0 and submit function should not be called', async () => {
        setup();
        await act(async () => {
          await fireEvent.changeText(screen.getByTestId('noOfCows-input'), '0');
          fireEvent.press(screen.getByText('Add data'));
        });

        expect(
          screen.getByText('Number of cows must be greater than 0')
        ).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });
    });

    describe('Quantity errors', () => {
      it('should render an error if the quantity is blank and submit function should not be called', async () => {
        setup();

        await act(() => {
          fireEvent.press(screen.getByText('Add data'));
        });

        expect(screen.getByText('Quantity is required')).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });

      it('should render an error if the quantity is less than 0 and submit function should not be called', async () => {
        setup();

        await act(async () => {
          await fireEvent.changeText(
            screen.getByTestId('quantity-input'),
            '-1'
          );
          fireEvent.press(screen.getByText('Add data'));
        });

        expect(
          screen.getByText('Quantity cannot be a negative number')
        ).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });
    });

    describe('Meter reading errors', () => {
      it('should render an error if the meter reading is blank and submit function should not be called', async () => {
        setup();

        await act(() => {
          fireEvent.press(screen.getByText('Add data'));
        });

        expect(screen.getByText('The meter reading is required')).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });

      it('should render an error if the meter reading is less than 0 and submit function should not be called', async () => {
        setup();

        await act(async () => {
          await fireEvent.changeText(
            screen.getByTestId('meterReading-input'),
            '-1'
          );
          fireEvent.press(screen.getByText('Add data'));
        });

        expect(
          screen.getByText('The meter reading cannot be a negative number')
        ).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });
    });

    describe('Water usage errors', () => {
      it('should render an error if the water usage is blank and submit function should not be called', async () => {
        setup();

        await act(() => {
          fireEvent.press(screen.getByText('Add data'));
        });

        expect(screen.getByText('The water usage is required')).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });

      it('should render an error if the water usage is less than 0 and submit function should not be called', async () => {
        setup();

        await act(async () => {
          await fireEvent.changeText(
            screen.getByTestId('waterUsage-input'),
            '-1'
          );
          fireEvent.press(screen.getByText('Add data'));
        });

        expect(
          screen.getByText('The water usage cannot be a negative number')
        ).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });
    });

    describe('Pump dial errors', () => {
      it('should render an error if the pump dial is blank and submit function should not be called', async () => {
        setup();

        await act(() => {
          fireEvent.press(screen.getByText('Add data'));
        });

        expect(screen.getByText('The pump dial is required')).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });

      it('should render an error if the pump dial is less than 0 and submit function should not be called', async () => {
        setup();

        await act(async () => {
          await fireEvent.changeText(
            screen.getByTestId('pumpDial-input'),
            '-1'
          );
          fireEvent.press(screen.getByText('Add data'));
        });

        expect(
          screen.getByText('The pump dial cannot be a negative number')
        ).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });
    });

    describe('Float before delivery errors', () => {
      it('should render an error if the float before delivery is blank and submit function should not be called', async () => {
        setup();

        await act(() => {
          fireEvent.press(screen.getByText('Add data'));
        });

        expect(
          screen.getByText('The float before delivery is required')
        ).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });

      it('should render an error if the float before delivery is less than 0 and submit function should not be called', async () => {
        setup();

        await act(async () => {
          await fireEvent.changeText(
            screen.getByTestId('floatBeforeDelivery-input'),
            '-1'
          );
          fireEvent.press(screen.getByText('Add data'));
        });

        expect(
          screen.getByText(
            'The float before delivery cannot be a negative number'
          )
        ).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });
    });

    describe('Target feed rate errors', () => {
      it('should render an error if the target feed rate is blank and submit function should not be called', async () => {
        setup();

        await act(() => {
          fireEvent.press(screen.getByText('Add data'));
        });

        expect(
          screen.getByText('The target feed rate is required')
        ).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });

      it('should render an error if the target feed rate is less than 0 and submit function should not be called', async () => {
        setup();

        await act(async () => {
          await fireEvent.changeText(
            screen.getByTestId('targetFeedRate-input'),
            '-1'
          );
          fireEvent.press(screen.getByText('Add data'));
        });

        expect(
          screen.getByText('The target feed rate cannot be a negative number')
        ).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });
    });

    describe('Float after delivery errors', () => {
      it('should render an error if the float after delivery is blank and submit function should not be called', async () => {
        setup();

        await act(() => {
          fireEvent.press(screen.getByText('Add data'));
        });

        expect(
          screen.getByText('The float after delivery is required')
        ).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });

      it('should render an error if the float after delivery is less than the float before delivery and submit function should not be called', async () => {
        setup();

        await act(async () => {
          await fireEvent.changeText(
            screen.getByTestId('floatBeforeDelivery-input'),
            '2'
          );
          await fireEvent.changeText(
            screen.getByTestId('floatAfterDelivery-input'),
            '1'
          );
          fireEvent.press(screen.getByText('Add data'));
        });

        expect(
          screen.getByText(
            'The float after delivery cannot be less than the float before delivery'
          )
        ).toBeTruthy();
        expect(mockFn).not.toHaveBeenCalled();
      });
    });
  });
});
