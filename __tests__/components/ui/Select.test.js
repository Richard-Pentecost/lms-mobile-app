import { act, fireEvent, render, screen } from '@testing-library/react-native';
// import userEvent from '@testing-library/user-event';
import Select from '../../../components/ui/Select';
import { product } from '../../../test-utils/data-factory';

describe('Select', () => {
  const props = {
    label: 'Label',
    products: [product(), product()],
    field: 'field',
    errors: '',
    touched: false,
  };

  let handleBlurMock;
  let handleChangeMock;

  const setup = (options = props) => {
    const { label, products, field, errors, touched } = options;

    handleBlurMock = jest.fn();
    handleChangeMock = jest.fn();

    const formik = {
      handleBlur: handleBlurMock,
      handleChange: handleChangeMock,
      values: { product: '' },
    };

    render(
      <Select
        label={label}
        field={field}
        products={products}
        errors={errors}
        touched={touched}
        formik={formik}
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the select with the correct label text', () => {
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

  it('should call the handleChange function when the select is pressed', async () => {
    setup();

    await act(async () => {
      await fireEvent.press(screen.getByText('Select product'));
    });

    expect(handleChangeMock).toHaveBeenCalledWith('field');
  });
});
