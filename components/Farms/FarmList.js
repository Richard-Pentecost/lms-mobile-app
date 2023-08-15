import { FlatList } from 'react-native';
import { Div } from 'react-native-magnus';
import FarmCard from './FarmCard';

const FarmList = ({ farms }) => {
  const renderFarmCard = ({ item }) => {
    onPressHandler = () => {
      console.log('navigation to be implemented');
    };

    const { farmName, postcode, contactName, contactNumber } = item;
    const farmCardProps = { farmName, postcode, contactName, contactNumber };
    return <FarmCard {...farmCardProps} onPress={onPressHandler} />;
  };

  return (
    <Div py={10}>
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        numColumns={2}
        data={farms}
        keyExtractor={(item) => item.uuid}
        renderItem={renderFarmCard}
      />
    </Div>
  );
};

export default FarmList;
