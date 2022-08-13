
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/Navigator/tabs';



export default function App() {
  return (

    <View style={styles.container} >
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
});
