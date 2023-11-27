import { Button, Div, Icon, Modal } from 'react-native-magnus';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, clearSuccessFlag } from '../../features/data/dataSlice';
import { updateData } from '../../features/data/dataThunk';
import { fetchActiveFarms } from '../../features/farms/farmsThunk';
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
    // console.log('EDIT DATA MODAL USE EFFECT');
    dispatch(fetchActiveFarms());
    closeModal();

    return () => {
      dispatch(clearSuccessFlag());
      dispatch(clearErrors());
    };
  }, [dispatch, addDataSuccess]);

  return (
    <Modal isVisible={showModal}>
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
