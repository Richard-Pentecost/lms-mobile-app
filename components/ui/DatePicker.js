import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';
import { Div, Text } from 'react-native-magnus';

const DatePicker = ({ date, errors, formik }) => {
  const handleChange = (_, selectedDate) => {
    formik.setFieldValue('date', selectedDate);
  };

  return (
    <>
      <Text fontSize="md" mt="lg">
        Date
      </Text>
      <Div
        mt="sm"
        bg="#fff"
        borderColor={errors ? 'red500' : 'gray400'}
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
          <Text color="red500" fontSize="md" mt="sm">
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
