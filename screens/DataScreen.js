import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Div, Text } from 'react-native-magnus';
import { useDispatch, useSelector } from 'react-redux';
import EditDataModal from '../components/Farm/EditDataModal';
import Table from '../components/Farm/Table';
import Header from '../components/ui/Header';
import { clearSuccessFlag } from '../features/data/dataSlice';
import { getFarmsState, selectedFarm } from '../features/farms/farmsSlice';
import { fetchActiveFarms } from '../features/farms/farmsThunk';

const DataScreen = ({ route }) => {
  const { farmId } = route.params;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [dataForEditing, setDataForEditing] = useState();
  const [previousData, setPreviousData] = useState();
  const { addDataSuccess } = useSelector((state) => state.dataState);
  const { farms, selectedFarm: farm } = useSelector(getFarmsState);
  const initialRender = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (addDataSuccess) {
        dispatch(fetchActiveFarms());
        dispatch(clearSuccessFlag());
      }
    }, [addDataSuccess])
  );

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      dispatch(selectedFarm(farmId));
    }
  }, [farms]);

  const openModal = (data, previousData) => {
    setDataForEditing(data);
    setPreviousData(previousData);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Div py={25}>
      <EditDataModal
        products={farm.products}
        farmId={farm.uuid}
        data={dataForEditing}
        previousData={previousData}
        showModal={showModal}
        closeModal={closeModal}
      />
      <Header>Data</Header>

      <Div px={10} mt={25}>
        {farm.data?.length > 0 ? (
          <Table data={farm.data} farmId={farm.uuid} openModal={openModal} />
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
