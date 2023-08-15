import { useEffect, useState } from 'react';
import { Div } from 'react-native-magnus';
import { useDispatch, useSelector } from 'react-redux';
import FarmList from '../components/Farms/FarmList';
import SearchBar from '../components/ui/SearchBar';
import { fetchActiveFarms } from '../features/farms/farmsThunk';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { farms } = useSelector((state) => state.farmsState);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!farms) {
      dispatch(fetchActiveFarms());
    }
  }, [dispatch, farms]);

  return (
    <Div px={25}>
      <SearchBar searchValue={search} setSearchValue={setSearch} />
      {/* <FilterSortPanel /> */}
      {farms && <FarmList farms={farms} />}
    </Div>
  );
};

export default HomeScreen;
