import { Div, Text } from 'react-native-magnus';
import Table from '../components/Farm/Table';
import Header from '../components/ui/Header';

const DataScreen = ({ route }) => {
  const { data } = route.params.farm;
  return (
    <Div py={25}>
      <Header>Data</Header>

      <Div px={10} mt={25}>
        {data?.length > 0 ? (
          <Table data={data} />
        ) : (
          <Div alignItems="center" pt={50}>
            <Text fontWeight="bold" fontSize="xl">
              No data found
            </Text>
          </Div>
        )}
      </Div>
    </Div>
  );
};

export default DataScreen;
