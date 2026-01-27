import { StatusBar } from 'expo-status-bar';
import InitialScreen from './src/screens/InitialScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LogInScreen from './src/screens/LogInScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import MotivationScreen from './src/screens/MotivationScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/common/navigationRef'
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { LikedIcon } from './src/common/favorite/LikedIcon';
import { favoriteToggle } from './src/common/favoriteToggle';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { useAppSelector, useFavoriteToggle } from "./src/store/hooks";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  )
}


function AppInner() {
  const isFavored = useAppSelector(state => state.favorites.isFavored);
  const toggle = useFavoriteToggle();

  function DrawerScreen() {
    return (
      <Drawer.Navigator >
        <Drawer.Screen name='MotivationScreen' component={MotivationScreen}
          options={{
            headerRight: () => <LikedIcon
              liked={isFavored}
              onToggle={toggle}
            />
          }}
        />
        <Drawer.Screen name='FavoriteScreen' component={FavoriteScreen} />
      </Drawer.Navigator>
    )
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name='InitialScreen' component={InitialScreen} />
        <Stack.Screen name='LogInScreen' component={LogInScreen} />
        <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
        <Stack.Screen name='Main Screens' component={DrawerScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
