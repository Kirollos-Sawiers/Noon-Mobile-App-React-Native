import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import Logo from "./assets/svg/noon-logo-en.svg";
import Tabs from './src/Navigator/tabs';
import Signinform from './src/Screens/sign-in-up-forms/signinform';
import Signupform from './src/Screens/sign-in-up-forms/signupform';
import Details from './src/Screens/Details/Details';
import Products from './src/Screens/Products/Products';
import UserProfile from './src/Screens/Userprofile/UserProfile';

const Stack = createStackNavigator();

export default function App() {
  return (

    <View style={styles.container} >

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={Tabs} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="Signin" component={Signinform} options={{
            headerShown: false,
          }}
          />
          <Stack.Screen name="Signup" component={Signupform} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="Details" component={Details} options={{
            headerShown: true,
          }} />
          <Stack.Screen name="Products" component={Products} options={{
            headerShown: true,
          }} />
          <Stack.Screen name="Profile" component={UserProfile} options={{
            headerShown: true,
          }} />

        </Stack.Navigator>
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
