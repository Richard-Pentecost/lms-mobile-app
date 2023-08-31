import { fireEvent, render, screen } from '@testing-library/react-native';
import InputField from '../../../components/ui/InputField';

describe('InputField', () => {
  const props = {
    label: 'Label',
    keyboardType: 'default',
    value: '',
    field: 'field',
    errors: '',
    touched: false,
    noOfLines: 1,
  };

  let handleBlurMock;
  let handleChangeMock;

  const setup = (options = props) => {
    const { label, keyboardType, value, field, errors, touched, noOfLines } =
      options;

    handleBlurMock = jest.fn();
    handleChangeMock = jest.fn();

    const formik = {
      handleBlur: handleBlurMock,
      handleChange: handleChangeMock,
    };

    render(
      <InputField
        label={label}
        keyboardType={keyboardType}
        value={value}
        field={field}
        errors={errors}
        touched={touched}
        formik={formik}
        noOfLines={noOfLines}
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the input with the correct label text', () => {
    setup();

    expect(screen.getByText('Label')).toBeTruthy();
  });

  it('should not render an error message if the errors props is blank', () => {
    setup();

    expect(screen.queryByTestId('error-container')).toBeFalsy();
  });

  it('should not render an error message when the errors props has an error if the touched prop is false', () => {
    setup({ ...props, errors: 'There is an error' });

    expect(screen.queryByTestId('error-container')).toBeFalsy();
  });

  it('should not render an error message if the touched prop is true but there is a blank errors prop', () => {
    setup({ ...props, touched: true });

    expect(screen.queryByTestId('error-container')).toBeFalsy();
  });

  it('should render the error message when there is an error and touched is true', () => {
    setup({ ...props, errors: 'There is an error', touched: true });

    expect(screen.getByTestId('error-container')).toBeTruthy();
    expect(screen.getByText('There is an error')).toBeTruthy();
  });

  it('should call the handleBlur function when the input is pressed', () => {
    setup();

    fireEvent.press(screen.getByTestId('field-input'));

    expect(handleBlurMock).toHaveBeenCalledWith('field');
  });
});
