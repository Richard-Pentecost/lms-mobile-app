import { Div, Text } from 'react-native-magnus';
import { useSelector } from 'react-redux';

const InternetConnectionBanner = () => {
  const isOnline = useSelector((state) => state.network.isConnected);

  return (
    <Div
      mt={10}
      row
      w="100%"
      borderWidth={1}
      borderColor={isOnline ? 'green300' : 'red300'}
      bg={isOnline ? 'green100' : 'red100'}
      rounded="md"
    >
      <Text p={10} fontWeight="bold">
        The application is {isOnline ? 'Online' : 'Offline'}
      </Text>
    </Div>
  );
};

export default InternetConnectionBanner;
