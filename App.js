import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { ReduxNetworkProvider } from 'react-native-offline';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './app/store';
import IconButton from './components/ui/IconButton';
import { Colours } from './constants/colours';
import { authenticateUser, logoutUser } from './features/auth/authSlice';
import FarmScreen from './screens/FarmScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

// SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTileVisible: false,
        headerRight: () => (
          <IconButton
            icon={'sign-out'}
            color={Colours.green100}
            size={24}
            onPress={logoutHandler}
          />
        ),
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Farm" component={FarmTabNavigation} />
    </Stack.Navigator>
  );
};

const FarmTabNavigation = ({ route, navigation }) => {
  const { farm } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: farm.farmName });
  }, [farm]);

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colours.green700,
      }}
    >
      <BottomTab.Screen
        name="Information"
        component={FarmScreen}
        initialParams={{ farm }}
        options={{
          tabBarIcon: ({ size }) => (
            <FontAwesome name="info" color={Colours.green700} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const Navigation = () => {
  const { token } = useSelector((state) => state.authState);
  return (
    <NavigationContainer>
      {token ? <AuthenticatedStack /> : <LoginStack />}
    </NavigationContainer>
  );
};

const Root = () => {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { loading: farmsLoading } = useSelector((state) => state.farmsState);
  const { loading: authLoading } = useSelector((state) => state.authState);
  const { loading: regionsLoading } = useSelector(
    (state) => state.regionsState
  );

  useEffect(() => {
    if (farmsLoading || authLoading || regionsLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [farmsLoading, authLoading, regionsLoading]);

  useEffect(() => {
    const fetchToken = async () => {
      dispatch(authenticateUser());
      setIsTryingLogin(false);
    };

    fetchToken();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (!isTryingLogin) {
      console.log('before splash screen hide async');
      await SplashScreen.hideAsync();
    }
    console.log('after splash screen hide async');
  }, [isTryingLogin]);

  if (isTryingLogin) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Spinner visible={loading} />
      <Navigation />
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Provider store={store}>
        <ReduxNetworkProvider>
          <Root />
        </ReduxNetworkProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
