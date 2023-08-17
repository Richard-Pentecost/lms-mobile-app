import { useState } from 'react';
import { Keyboard, LayoutAnimation, Pressable, StyleSheet } from 'react-native';
import { Button, Div, Icon, Input } from 'react-native-magnus';

const SearchBar = ({ searchValue, setSearchValue }) => {
  const [clicked, setClicked] = useState(false);

  const cancelSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Keyboard.dismiss();
    setClicked(false);
    clearSearch();
  };

  const selectSearchBar = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setClicked(true);
  };

  const onTextChange = (text) => {
    setSearchValue(text);
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  return (
    <Div mt={20} flexDirection="row">
      <Input
        fontSize="xl"
        bg="white"
        flex={1}
        rounded={10}
        placeholder="Search by farm name..."
        borderColor="transparent"
        returnKeyType="search"
        onChangeText={onTextChange}
        value={searchValue}
        prefix={
          <Icon
            name="search"
            color="gray500"
            fontFamily="Feather"
            fontSize="2xl"
          />
        }
        suffix={
          clicked &&
          searchValue.length > 0 && (
            <Pressable
              onPress={clearSearch}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Icon
                name="close-circle"
                color="gray600"
                fontFamily="Ionicons"
                fontSize="2xl"
              />
            </Pressable>
          )
        }
        onFocus={selectSearchBar}
      />
      {clicked && (
        <Div>
          <Button title="Cancel" onPress={cancelSearch} />
        </Div>
      )}
    </Div>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.25,
  },
});