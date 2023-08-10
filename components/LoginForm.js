import { useFormik } from 'formik';
import { Button, Div, Input, Text } from 'react-native-magnus';
import { loginValidator } from '../utils/formValidators';

const LoginForm = ({ loginUser }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ email, password }) => {
      loginUser({ email, password });
    },
    validationSchema: loginValidator,
  });

  // useEffect(() => {
  //   if (error) {
  //     Alert.alert(
  //       'Incorrect Login Details',
  //       'The email or password you entered was incorrect. \n Please try again.'
  //     );
  //   }
  // }, [error]);

  return (
    <Div m="lg">
      <Text mt="2xl" color="gray900" fontWeight="bold" fontSize="6xl">
        Login
      </Text>
      <Text color="gray500" mt="sm">
        Login to your account with your email and password
      </Text>
      <Text fontSize="md" mt="2xl">
        Email
      </Text>
      <Input
        testID="email"
        mt="sm"
        py="lg"
        placeholder="Email address"
        focusBorderColor="blue400"
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
        autoCapitalize="none"
        borderColor={
          formik.touched.email && formik.errors.email ? 'red500' : 'gray400'
        }
      />
      <Div h={5}>
        <Div position="absolute" top={0} zIndex={1}>
          <Text color="red500" fontSize="md" mt="sm">
            {formik.touched.email && formik.errors.email}
          </Text>
        </Div>
      </Div>
      <Text fontSize="md" mt="xl">
        Password
      </Text>
      <Input
        testID="password"
        mt="sm"
        py="lg"
        placeholder="Password"
        secureTextEntry
        focusBorderColor="blue400"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        borderColor={
          formik.touched.password && formik.errors.password
            ? 'red500'
            : 'gray400'
        }
      />
      <Div h={5}>
        <Div position="absolute" top={0} zIndex={1}>
          <Text color="red500" fontSize="md" mt="sm">
            {formik.touched.password && formik.errors.password}
          </Text>
        </Div>
      </Div>
      <Button
        testID="submit"
        block
        py="lg"
        mt="xl"
        bg="green700"
        onPress={formik.handleSubmit}
      >
        Submit
      </Button>
    </Div>
  );
};

export default LoginForm;
