import { useState } from 'react';
import { Div, Text } from 'react-native-magnus';
import { useSelector } from 'react-redux';
import EditDataModal from '../components/Farm/EditDataModal';
import Table from '../components/Farm/Table';
import Header from '../components/ui/Header';

const DataScreen = ({ route }) => {
  const [showModal, setShowModal] = useState(false);
  const [dataForEditing, setDataForEditing] = useState();
  const [previousData, setPreviousData] = useState();
  const { data, uuid, products } = route.params.farm;
  // const [{ data, products }] = useSelector((state) =>
  //   state.farmsState.farms.filter((farm) => farm.uuid === uuid)
  // );

  const farm = useSelector((state) => {
    return state.farmsState.farms.filter((farm) => farm.uuid === uuid);
  });
  // console.log('***** farm ******');
  // console.log(farm);
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
        products={products}
        farmId={uuid}
        data={dataForEditing}
        previousData={previousData}
        showModal={showModal}
        closeModal={closeModal}
      />
      <Header>Data</Header>
      <Div px={10} mt={25}>
        {data?.length > 0 ? (
          <Table data={data} farmId={uuid} openModal={openModal} />
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
