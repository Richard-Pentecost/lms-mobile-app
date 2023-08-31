import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { Div, Text } from 'react-native-magnus';
import SelectDropdown from 'react-native-select-dropdown';

const Select = ({ label, field, products, errors, touched, formik }) => {
  const dropdownBoxStyling = () => {
    return errors && touched
      ? { ...styles.dropdownBoxBtnStyle, borderColor: '#f56565' }
      : styles.dropdownBoxBtnStyle;
  };

  return (
    <>
      <Text fontSize="md" mt="lg">
        {label}
      </Text>
      <Div testID="dropdown">
        <SelectDropdown
          data={products}
          onSelect={formik.handleChange(field)}
          onBlur={() => formik.handleBlur(field)}
          defaultButtonText={'Select product'}
          defaultValue={formik.values.product}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          buttonStyle={dropdownBoxStyling()}
          buttonTextStyle={styles.dropdownBoxBtnTxtStyle}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#cbd5e0'}
                size={14}
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdownBoxDropdownStyle}
          rowStyle={styles.dropdownBoxRowStyle}
          rowTextStyle={styles.dropdownBoxRowTxtStyle}
        />
      </Div>
      {touched && errors && (
        <Div testID="error-container">
          <Text color="red500" fontSize="md" mt="sm">
            {errors}
          </Text>
        </Div>
      )}
    </>
  );
};

export default Select;

const styles = StyleSheet.create({
  dropdownBoxBtnStyle: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#cbd5e0',
    marginTop: 6,
  },
  dropdownBoxBtnTxtStyle: {
    marginLeft: 5,
    color: '#1a202c',
    textAlign: 'left',
    fontSize: 11,
  },
  dropdownBoxDropdownStyle: { backgroundColor: '#EFEFEF', borderRadius: 6 },
  dropdownBoxRowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#cbd5e0',
  },
  dropdownBoxRowTxtStyle: {
    fontSize: 11,
    color: '#1a202c',
    textAlign: 'left',
  },
  dropdownInvalid: {
    borderColor: '#f56565',
  },
});
