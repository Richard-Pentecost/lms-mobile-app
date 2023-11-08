import { useEffect } from 'react';
import { Div } from 'react-native-magnus';
import { useDispatch, useSelector } from 'react-redux';
import DataForm from '../components/Farm/DataForm';
import Header from '../components/ui/Header';
import { clearErrors, clearSuccessFlag } from '../features/data/dataSlice';
import { addData } from '../features/data/dataThunk';

const AddDataScreen = ({ route, navigation }) => {
  const { farm } = route.params;
  const dispatch = useDispatch();
  const { addDataSuccess } = useSelector((state) => state.dataState);

  const addDataHandler = (newData) => {
    const { uuid, data } = farm;
    const dataObj = { ...newData, farmFk: uuid };

    const previousData = data
      .filter((d) => d.product === newData.product)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    dispatch(addData({ data: dataObj, previousData }));
  };

  useEffect(() => {
    addDataSuccess && navigation.navigate('Data');

    return () => {
      dispatch(clearSuccessFlag());
      dispatch(clearErrors());
    };
  }, [dispatch, addDataSuccess, navigation]);

  return (
    <Div py={25}>
      <Header>Add Data</Header>
      <DataForm products={farm.products} handleSubmit={addDataHandler} />
    </Div>
  );
};

export default AddDataScreen;
