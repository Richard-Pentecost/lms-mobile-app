import { Div, Icon, Text } from 'react-native-magnus';
import { Colours } from '../../constants/colours';

const ListItem = ({
  icon,
  label,
  iconLibrary,
  bottomBorder = true,
  children,
}) => {
  return (
    <Div
      row
      alignItems="center"
      px={16}
      py={10}
      borderBottomWidth={bottomBorder && 1}
      borderColor={'#eee'}
      testID={`${label}-container`}
    >
      <Div row alignItems="center" flex={1}>
        <Div mr={15}>
          <Icon
            testID="icon"
            name={icon}
            fontSize={20}
            fontFamily={iconLibrary}
            color={Colours.grey100}
          />
        </Div>
        <Div>
          <Text fontSize="lg">{label}</Text>
        </Div>
      </Div>
      <Div flex={1}>
        <Text textAlign="right" fontSize="lg">
          {children}
        </Text>
      </Div>
    </Div>
  );
};

export default ListItem;
