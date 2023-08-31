import { Div, Input, Text } from 'react-native-magnus';

const InputField = ({
  label,
  keyboardType,
  value,
  field,
  errors,
  touched,
  formik,
  noOfLines,
}) => (
  <>
    <Text fontSize="md" mt="lg">
      {label}
    </Text>
    <Input
      testID={`${field}-input`}
      mt="sm"
      py="lg"
      placeholder={label}
      autoCapitalize="none"
      keyboardType={keyboardType}
      value={value}
      onChangeText={formik.handleChange(field)}
      onBlur={formik.handleBlur(field)}
      borderColor={touched && errors ? 'red500' : 'gray400'}
      focusBorderColor="blue400"
      multiline={!!noOfLines}
      numberOfLines={noOfLines}
      textAlignVertical={'top'}
    />
    {touched && errors && (
      <Div testID="error-container">
        <Text color="red500" fontSize="md" mt="sm">
          {errors}
        </Text>
      </Div>
    )}
  </>
);

export default InputField;
