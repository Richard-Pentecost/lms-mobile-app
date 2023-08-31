import { useFormik } from 'formik';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Button, Div } from 'react-native-magnus';
import { dataValidator } from '../../utils/formValidators';
import DatePicker from '../ui/DatePicker';
import InputField from '../ui/InputField';
import Select from '../ui/Select';

const DataForm = ({ products, handleSubmit, data }) => {
  const formik = useFormik({
    initialValues: {
      date: data ? new Date(data.date) : new Date(),
      product: data ? data.product : '',
      noOfCows: data ? `${data.noOfCows}` : '',
      quantity: data ? data.quantity : '',
      meterReading: data ? data.meterReading : '',
      waterUsage: data ? data.waterUsage : '',
      pumpDial: data ? data.pumpDial : '',
      floatBeforeDelivery: data ? data.floatBeforeDelivery : '',
      targetFeedRate: data ? data.targetFeedRate : '',
      floatAfterDelivery: data ? data.floatAfterDelivery : '',
      comments: data ? data.comments : '',
    },
    onSubmit: (data) => {
      handleSubmit(data);
    },
    validationSchema: dataValidator,
  });

  const productNames = products.map((product) => product.productName);

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={10}
      >
        <Div px={25}>
          <DatePicker
            date={formik.values.date}
            errors={formik.errors.date}
            formik={formik}
          />
          <Select
            label="Product"
            field="product"
            products={productNames}
            errors={formik.errors.product}
            touched={formik.touched.product}
            formik={formik}
          />
          <InputField
            label="Number of cows"
            keyboardType="number-pad"
            value={formik.values.noOfCows}
            field="noOfCows"
            errors={formik.errors.noOfCows}
            touched={formik.touched.noOfCows}
            formik={formik}
          />
          <InputField
            label="Quantity"
            keyboardType="number-pad"
            value={formik.values.quantity}
            field="quantity"
            errors={formik.errors.quantity}
            touched={formik.touched.quantity}
            formik={formik}
          />
          <InputField
            label="Meter reading"
            keyboardType="number-pad"
            value={formik.values.meterReading}
            field="meterReading"
            errors={formik.errors.meterReading}
            touched={formik.touched.meterReading}
            formik={formik}
          />
          <InputField
            label="Water usage"
            keyboardType="number-pad"
            value={formik.values.waterUsage}
            field="waterUsage"
            errors={formik.errors.waterUsage}
            touched={formik.touched.waterUsage}
            formik={formik}
          />
          <InputField
            label="Pump dial"
            keyboardType="number-pad"
            value={formik.values.pumpDial}
            field="pumpDial"
            errors={formik.errors.pumpDial}
            touched={formik.touched.pumpDial}
            formik={formik}
          />
          <InputField
            label="Float before delivery"
            keyboardType="number-pad"
            value={formik.values.floatBeforeDelivery}
            field="floatBeforeDelivery"
            errors={formik.errors.floatBeforeDelivery}
            touched={formik.touched.floatBeforeDelivery}
            formik={formik}
          />
          <InputField
            label="Target feed rate"
            keyboardType="number-pad"
            value={formik.values.targetFeedRate}
            field="targetFeedRate"
            errors={formik.errors.targetFeedRate}
            touched={formik.touched.targetFeedRate}
            formik={formik}
          />
          <InputField
            label="Float after delivery"
            keyboardType="number-pad"
            value={formik.values.floatAfterDelivery}
            field="floatAfterDelivery"
            errors={formik.errors.floatAfterDelivery}
            touched={formik.touched.floatAfterDelivery}
            formik={formik}
          />
          <InputField
            label="Comments"
            value={formik.values.comments}
            field="comments"
            errors={formik.errors.comments}
            touched={formik.touched.comments}
            formik={formik}
            noOfLines={4}
          />
          <Button
            block
            py="lg"
            my="xl"
            bg="green700"
            onPress={formik.handleSubmit}
          >
            {data ? 'Update data' : 'Add data'}
          </Button>
        </Div>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default DataForm;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});
