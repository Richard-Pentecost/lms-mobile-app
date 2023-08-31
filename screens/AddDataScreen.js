import { Div } from 'react-native-magnus';
import DataForm from '../components/Farm/DataForm';
import Header from '../components/ui/Header';

const AddDataScreen = ({ route, navigation }) => {
  const { farm } = route.params;

  const addDataHandler = (newData) => {
    console.log('addData');
    console.log(newData);
  };

  return (
    <Div py={25}>
      <Header>Add Data</Header>
      <DataForm products={farm.products} handleSubmit={addDataHandler} />
    </Div>
  );
};

export default AddDataScreen;
