import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { loginUser } from '../features/auth/authThunk';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const loginHandler = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.screenContainer}>
        <LoginForm loginUser={loginHandler} />
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    paddingTop: 100,
  },
});
