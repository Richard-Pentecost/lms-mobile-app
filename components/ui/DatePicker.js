import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';
import { Div, Text } from 'react-native-magnus';
import { Colours } from '../../constants/colours';

const DatePicker = ({ date, errors, formik }) => {
  const handleChange = (_, selectedDate) => {
    formik.setFieldValue('date', selectedDate);
  };

  return (
    <>
      <Text fontSize="md" mt="sm">
        Date
      </Text>
      <Div
        mt="sm"
        bg={Colours.white100}
        borderColor={errors ? Colours.red500 : Colours.grey400}
        borderWidth={1}
        rounded="md"
        testID="datePicker-container"
      >
        <Div w={110} rounded="md">
          <DateTimePicker
            testID="datePicker"
            value={date}
            mode="date"
            display="default"
            onChange={handleChange}
            style={styles.datepicker}
          />
        </Div>
      </Div>
      {errors && (
        <Div testID="error-container">
          <Text color={Colours.red500} fontSize="md" mt="sm">
            {errors}
          </Text>
        </Div>
      )}
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  datepicker: {
    borderRadius: 6,
  },
});
