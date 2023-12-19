import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { Div, Text } from 'react-native-magnus';
import SelectDropdown from 'react-native-select-dropdown';
import { Colours } from '../../constants/colours';

const Select = ({ label, field, products, errors, touched, formik }) => {
  const dropdownBoxStyling = () => {
    return errors && touched
      ? { ...styles.dropdownBoxBtnStyle, borderColor: Colours.red500 }
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
                color={Colours.grey400}
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
          <Text color={Colours.red500} fontSize="md" mt="sm">
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
    backgroundColor: Colours.white100,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colours.grey400,
    marginTop: 6,
  },
  dropdownBoxBtnTxtStyle: {
    marginLeft: 5,
    color: Colours.grey900,
    textAlign: 'left',
    fontSize: 11,
  },
  dropdownBoxDropdownStyle: {
    backgroundColor: Colours.white200,
    borderRadius: 6,
  },
  dropdownBoxRowStyle: {
    backgroundColor: Colours.white200,
    borderBottomColor: Colours.grey400,
  },
  dropdownBoxRowTxtStyle: {
    fontSize: 11,
    color: Colours.grey900,
    textAlign: 'left',
  },
  dropdownInvalid: {
    borderColor: Colours.red500,
  },
});
