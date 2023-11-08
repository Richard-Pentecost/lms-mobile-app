import { Div } from 'react-native-magnus';
import Header from '../components/ui/Header';
import InternetConnectionBanner from '../components/ui/InternetConnectionBanner';
import RandomNameGenerator from '../components/ui/RandomNameGenerator';

const RandomNameGeneratorScreen = () => {
  return (
    <Div py={25}>
      <Header>Random Name Generator</Header>
      <Div px={25}>
        <InternetConnectionBanner />
        <RandomNameGenerator />
      </Div>
    </Div>
  );
};

export default RandomNameGeneratorScreen;
