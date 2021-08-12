import React, {} from 'react';
import { StyleSheet} from 'react-native';

import Default from './screens/default';
import Main from './screens/main';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'

//navigator settings

enableScreens;
const Stack = createSharedElementStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#6cbad8'
  },
};

const App = () => {

  return (   
    <NavigationContainer 
    style={styles.container} 
    theme={MyTheme} 
    >
    <Stack.Navigator 
    screenOptions={{
      headerShown: false
      
    }}>
    <Stack.Screen name="Main" 
        component={Main} 
        options={{
          cardOverlayEnabled: false,
          cardShadowEnabled: false,
          detachPreviousScreen: true,
      }} />
    <Stack.Screen name="Default" 
        component={Default} 
        options={{
        cardOverlayEnabled: false,
        cardShadowEnabled: false,
        detachPreviousScreen: true,
    }} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})



export default App;