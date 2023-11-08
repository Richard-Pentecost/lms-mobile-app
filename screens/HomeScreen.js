import { useEffect, useState } from 'react';
import { Div } from 'react-native-magnus';
import { useSelector } from 'react-redux';
import FarmList from '../components/Farms/FarmList';
import FilterSortPanel from '../components/ui/FilterSortPanel';
import InternetConnectionBanner from '../components/ui/InternetConnectionBanner';
import SearchBar from '../components/ui/SearchBar';

const HomeScreen = () => {
  const { farms } = useSelector((state) => state.farmsState);
  const { regions } = useSelector((state) => state.regionsState);
  const [filteredFarms, setFilteredFarms] = useState(farms);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    setFilteredFarms(farms);
  }, [farms]);

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
    </Div>
  );
};

export default HomeScreen;
