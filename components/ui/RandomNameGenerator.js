import { FlatList } from 'react-native';
import { Button, Div, Text } from 'react-native-magnus';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomUserEmail } from '../../features/randomNames/randomNamesSlice';
import { fetchRandomName } from '../../features/randomNames/randomNamesThunk';
import ActionQueue from './ActionQueue';

const RandomNameGenerator = () => {
  const dispatch = useDispatch();
  const DATA = useSelector(getRandomUserEmail);

  const buttonClickHandler = () => {
    console.log('Generate Random Data button clicked!');
    dispatch(fetchRandomName());
  };

  const Item = ({ title }) => (
    <Div p={20} my={8} mx={16} bg="green400">
      <Text fontSize="3xl">{title}</Text>
    </Div>
  );

  const renderItem = ({ item }) => <Item title={item.title} />;
  return (
    <Div px={3} alignItems="center">
      <FlatList
        data={DATA}
        renderItem={renderItem}
        ketyExtractor={(item) => item.id}
      />
      <ActionQueue />
      <Div>
        <Button onPress={buttonClickHandler} mt={5}>
          Generate Random User Data
        </Button>
      </Div>
    </Div>
  );
};

export default RandomNameGenerator;
