import { Button, Div, Text } from 'react-native-magnus';
import FarmCardDetail from './FarmCardDetail';

const FarmCard = ({
  farmName,
  postcode,
  contactName,
  contactNumber,
  onPress,
}) => (
  <Div shadow="sm" w="48%" mb={10} rounded="lg" bg="white" r>
    <Button block h={120} p="none" bg="white" rounded="lg" onPress={onPress}>
      <Div flex={1} p={10}>
        <Div pb={5} borderBottomColor="gray500" borderBottomWidth={1}>
          <Text fontWeight="bold" fontSize="xl">
            {farmName}
          </Text>
        </Div>
        <Div pt={10}>
          <FarmCardDetail icon="address-card-o" iconLibrary="FontAwesome">
            {postcode}
          </FarmCardDetail>
          <FarmCardDetail icon="user" iconLibrary="Feather">
            {contactName}
          </FarmCardDetail>
          <FarmCardDetail icon="phone-square" iconLibrary="FontAwesome">
            {contactNumber}
          </FarmCardDetail>
        </Div>
      </Div>
    </Button>
  </Div>
);

export default FarmCard;
