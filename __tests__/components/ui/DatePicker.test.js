import { render, screen } from '@testing-library/react-native';
import dayjs from 'dayjs';
import DatePicker from '../../../components/ui/DatePicker';
import { Colours } from '../../../constants/colours';

describe('DatePicker', () => {
  const props = {
    date: new Date(),
    errors: '',
    touched: false,
  };

  let handleSetFieldChangeMock;

  const setup = (options = props) => {
    const { date, errors, touched } = options;

    handleSetFieldChangeMock = jest.fn();

    const formik = {
      setFieldValue: handleSetFieldChangeMock,
    };

    render(
      <DatePicker
        date={date}
        errors={errors}
        touched={touched}
        formik={formik}
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the date picker with the correct date', () => {
    setup();

    const checkDate = dayjs().endOf('day');
    const datePickerValue = dayjs(screen.getByTestId('datePicker').value).endOf(
      'day'
    );
    expect(datePickerValue).toEqual(checkDate);
  });

  it('should not render an error message if the errors prop is blank', () => {
    setup();

    expect(screen.queryByTestId('error-container')).toBeFalsy();
    expect(
      screen.getByTestId('datePicker-container').props.style.borderColor
    ).toEqual(Colours.grey400);
  });

  it('should not render an error message if the errors props is blank', () => {
    setup();

    expect(screen.queryByTestId('error-container')).toBeFalsy();
  });

  it('should render the error message when there is an error and touched is true', () => {
    setup({ date: props.date, errors: 'There is an error', touched: true });

    expect(screen.getByTestId('error-container')).toBeTruthy();
    expect(screen.getByText('There is an error')).toBeTruthy();
    expect(
      screen.getByTestId('datePicker-container').props.style.borderColor
    ).toEqual(Colours.red500);
  });
});
