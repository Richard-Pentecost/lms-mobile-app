import { useRef } from 'react';
import { Button, Pressable, StyleSheet } from 'react-native';
import { Div, Dropdown, Icon, Text } from 'react-native-magnus';
import { Colours } from '../../constants/colours';

const FilterSortPanel = ({ regions, region, setRegion }) => {
  const dropdownRef = useRef();

  return (
    <Div row py={10} justifyContent="space-between" alignItems="center">
      <Pressable
        style={(({ pressed }) => pressed && styles.pressed, styles.filter)}
        onPress={() => !region && dropdownRef.current?.open()}
      >
        <Div row>
          <Text fontWeight="bold" fontSize="xl" my={4}>
            {region ? `Filtering by ${region} region` : 'Filter'}
          </Text>
          {!region && (
            <Icon
              name="caret-down"
              fontFamily="FontAwesome"
              size={16}
              color={Colours.grey900}
              ml={5}
            />
          )}
        </Div>
      </Pressable>
      {region && (
        <Div justifyContent="center">
          <Button title="Clear filter" onPress={() => setRegion('')}></Button>
        </Div>
      )}
      <Dropdown
        ref={dropdownRef}
        title={
          <Text
            mx="xl"
            color="gray900"
            fontWeight="bold"
            fontSize="2xl"
            pb="lg"
          >
            Select region
          </Text>
        }
        mt="md"
        pb="xl"
        showSwipeIndicator={true}
        roundedTop="xl"
      >
        {regions.map((region) => (
          <Dropdown.Option
            key={region.regionName}
            py="lg"
            px="xl"
            block
            onPress={() => setRegion(region.regionName)}
          >
            {region.regionName}
          </Dropdown.Option>
        ))}
      </Dropdown>
    </Div>
  );
};

export default FilterSortPanel;

const styles = StyleSheet.create({
  filter: {
    paddingVertical: 5,
    paddingRight: 10,
  },
  pressed: {
    opacity: 0.25,
  },
});
