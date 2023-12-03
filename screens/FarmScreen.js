import { useSelector } from 'react-redux';
import FarmInformation from '../components/Farm/FarmInformation';
import { getFarmsState } from '../features/farms/farmsSlice';

const FarmScreen = () => {
  const { selectedFarm: farm } = useSelector(getFarmsState);

  return <FarmInformation farm={farm} />;
};

export default FarmScreen;
