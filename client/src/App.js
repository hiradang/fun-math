import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Account from './screens/Account';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tài khoản"
          options={{
            headerLeft: () => <AntDesign name="arrowleft" size={30} style={{ marginLeft: 20 }} />,
            headerRight: () => <AntDesign name="setting" size={30} style={{ marginRight: 20 }} />,
          }}
          component={Account}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
