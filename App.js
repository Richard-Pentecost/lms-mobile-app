import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Toggle } from 'react-native-magnus';
import { ReduxNetworkProvider } from 'react-native-offline';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './app/store';
import IconButton from './components/ui/IconButton';
import { Colours } from './constants/colours';
import { authenticateUser, logoutUser } from './features/auth/authSlice';
import { fetchActiveFarms } from './features/farms/farmsThunk';
import { fetchRegions } from './features/regions/regionsThunk';
import AddDataScreen from './screens/AddDataScreen';
import DataScreen from './screens/DataScreen';
import FarmScreen from './screens/FarmScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { isTokenValid } from './utils/tokenManager';

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

const AuthenticatedStack = ({ toggle, toggleHandler }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(fetchActiveFarms());
    dispatch(fetchRegions());
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTileVisible: false,
        headerRight: () => (
          <>
            <Toggle
              on={toggle}
              onPress={toggleHandler}
              mr={20}
              bg="red500"
              h={20}
              w={40}
            />
            <IconButton
              icon={'sign-out'}
              color={Colours.grey900}
              size={24}
              onPress={logoutHandler}
            />
          </>
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
        tabBarInactiveTintColor: Colours.grey900,
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
      }}
    >
      <BottomTab.Screen
        name="Information"
        component={FarmScreen}
        initialParams={{ farm }}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <FontAwesome
              name="info"
              color={focused ? Colours.green700 : Colours.grey900}
              size={size}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Data"
        component={DataScreen}
        initialParams={{ farm }}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <FontAwesome
              name="table"
              color={focused ? Colours.green700 : Colours.grey900}
              size={size}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Add Data"
        component={AddDataScreen}
        initialParams={{ farm }}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <FontAwesome
              name="plus"
              color={focused ? Colours.green700 : Colours.grey900}
              size={size}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const Navigation = ({ toggle, toggleHandler }) => {
  const { token } = useSelector((state) => state.authState);

  return (
    <NavigationContainer>
      {isTokenValid(token) ? (
        <AuthenticatedStack toggle={toggle} toggleHandler={toggleHandler} />
      ) : (
        <LoginStack />
      )}
    </NavigationContainer>
  );
};

const Root = ({ toggle, toggleHandler }) => {
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
      await SplashScreen.hideAsync();
    }
  }, [isTryingLogin]);

  if (isTryingLogin) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Spinner visible={loading} />
      <Navigation toggle={toggle} toggleHandler={toggleHandler} />
    </View>
  );
};

export default function App() {
  const [toggle, setToggle] = useState(true);
  const toggleHandler = () => {
    setToggle(!toggle);
  };
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ReduxNetworkProvider
            pingServerUrl={
              toggle ? 'https://google.com' : 'https://asdgoogle.com'
            }
          >
            <Root toggle={toggle} toggleHandler={toggleHandler} />
          </ReduxNetworkProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
