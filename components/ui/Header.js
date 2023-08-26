import { Div, Text } from 'react-native-magnus';

const Header = ({ children }) => (
  <Div mx={25} pb={10} borderBottomWidth={1} borderBottomColor="gray400">
    <Text color="gray900" fontWeight="bold" fontSize="4xl">
      {children}
    </Text>
  </Div>
);

export default Header;
