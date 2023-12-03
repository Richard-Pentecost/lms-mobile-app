import { useEffect } from 'react';
import { Button, Div, Icon, Modal } from 'react-native-magnus';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../features/data/dataSlice';
import { updateData } from '../../features/data/dataThunk';
import Header from '../ui/Header';
import DataForm from './DataForm';

const EditDataModal = ({
  products,
  farmId,
  data,
  previousData,
  showModal,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const { addDataSuccess } = useSelector((state) => state.dataState);

  const updateDataHandler = (newData) => {
    const dataObj = { ...newData, farmFk: farmId };
    const dataId = data.uuid;

    dispatch(updateData({ data: dataObj, dataId, previousData }));
  };

  useEffect(() => {
    addDataSuccess && closeModal();

    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch, addDataSuccess]);

  return (
    <Modal isVisible={showModal} useNativeDriver={true}>
      <Div py={25}>
        <Button
          bg="gray400"
          h={35}
          w={35}
          position="absolute"
          top={10}
          right={20}
          onPress={closeModal}
          rounded="circle"
          zIndex={1}
        >
          <Icon color="gray900" name="close" h={17} w={15} />
        </Button>
        <Header>Edit Data</Header>
        <DataForm
          products={products}
          handleSubmit={updateDataHandler}
          data={data}
        />
      </Div>
    </Modal>
  );
};

export default EditDataModal;
