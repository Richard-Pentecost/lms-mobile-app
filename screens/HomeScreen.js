import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Button, Div } from 'react-native-magnus';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from '../app/store';
import FarmList from '../components/Farms/FarmList';
import ActionQueue from '../components/ui/ActionQueue';
import FilterSortPanel from '../components/ui/FilterSortPanel';
import InternetConnectionBanner from '../components/ui/InternetConnectionBanner';
import SearchBar from '../components/ui/SearchBar';
import { Colours } from '../constants/colours';
import { clearSelectedFarm } from '../features/farms/farmsSlice';
import { fetchActiveFarms } from '../features/farms/farmsThunk';

const HomeScreen = () => {
  const { farms } = useSelector((state) => state.farmsState);
  const { regions } = useSelector((state) => state.regionsState);
  const [filteredFarms, setFilteredFarms] = useState(farms);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredFarms(farms);
  }, [farms]);

  useEffect(() => {
    searchFilterFunction();
  }, [search, region]);

  useFocusEffect(
    useCallback(() => {
      dispatch(clearSelectedFarm());
    }, [dispatch, clearSelectedFarm])
  );
  const getFarmsHandler = () => {
    console.log('getFarmsHandler');
    dispatch(fetchActiveFarms());
  };

  const clearFarmsHandler = () => {
    console.log('clearFarmsHandler');
    persistor.purge();
  };

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
      <InternetConnectionBanner />
      <SearchBar searchValue={search} setSearchValue={setSearch} />
      {regions && (
        <FilterSortPanel
          regions={regions}
          region={region}
          setRegion={setRegion}
        />
      )}
      {farms && <FarmList farms={filteredFarms} />}
      <Div alignItems="center">
        <ActionQueue />
      </Div>
      <Div row justifyContent="center">
        <Button onPress={getFarmsHandler} bg={Colours.green500} mx={10}>
          Get Farms
        </Button>
        <Button onPress={clearFarmsHandler} bg={Colours.red500} mx={10}>
          Remove Farms State
        </Button>
      </Div>
    </Div>
  );
};

export default HomeScreen;
