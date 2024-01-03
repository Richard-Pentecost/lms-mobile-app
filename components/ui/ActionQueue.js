import { Text } from 'react-native-magnus';
import { useSelector } from 'react-redux';
import { getNetworkActionQueue } from '../../features/randomNames/randomNamesSlice';

const ActionQueue = () => {
  const actionQueue = useSelector(getNetworkActionQueue);
  console.log('*********** ACTION QUEUE **********');
  console.log(actionQueue);
  return (
    <>
      <Text>Action Queue:</Text>
      <Text>{actionQueue.length}</Text>
      {actionQueue.map((action, index) => (
        <Text key={index}>{action.meta.name}</Text>
      ))}
    </>
  );
};

export default ActionQueue;
