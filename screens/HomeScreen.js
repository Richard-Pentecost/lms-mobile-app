import { useEffect, useState } from 'react';
import { Div } from 'react-native-magnus';
import { useDispatch, useSelector } from 'react-redux';
import FarmList from '../components/Farms/FarmList';
import FilterSortPanel from '../components/ui/FilterSortPanel';
import SearchBar from '../components/ui/SearchBar';
import { fetchActiveFarms } from '../features/farms/farmsThunk';
import { fetchRegions } from '../features/regions/regionsThunk';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { farms } = useSelector((state) => state.farmsState);
  const { regions } = useSelector((state) => state.regionsState);
  const [filteredFarms, setFilteredFarms] = useState(farms);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    if (!farms) {
      dispatch(fetchActiveFarms());
    }
    setFilteredFarms(farms);
  }, [dispatch, farms]);

  useEffect(() => {
    if (!regions) {
      dispatch(fetchRegions());
    }
  }, [dispatch, regions]);

  useEffect(() => {
    searchFilterFunction();
  }, [search, region]);

  const searchFilterFunction = () => {
    if (search || region) {
      const filterFarms = farms
        .filter((farm) =>
          farm.farmName.toUpperCase().includes(search.toUpperCase())
        )
        .filter((farm) => (region ? farm.region?.regionName === region : farm));
      setFilteredFarms(filterFarms);
    } else {
      setFilteredFarms(farms);
    }
  };
  return (
    <Div px={25}>
      <SearchBar searchValue={search} setSearchValue={setSearch} />
      {regions && (
        <FilterSortPanel
          regions={regions}
          region={region}
          setRegion={setRegion}
        />
      )}
      {farms && <FarmList farms={filteredFarms} />}
    </Div>
  );
};

export default HomeScreen;
