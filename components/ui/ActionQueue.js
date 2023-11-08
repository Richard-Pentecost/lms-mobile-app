import { Text } from 'react-native-magnus';
import { useSelector } from 'react-redux';
import { getNetworkActionQueue } from '../../features/randomNames/randomNamesSlice';

const ActionQueue = () => {
  const actionQueue = useSelector(getNetworkActionQueue);

  return (
    <>
      <Text>Action Queue:</Text>
      <Text>{actionQueue.length}</Text>
    </>
  );
};

export default ActionQueue;
