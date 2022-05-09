import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import ListCourses from './screens/ListCourses';
import HeaderStyles from './utils/HeaderStyles';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="ListCourses"
          component={ListCourses}
          options={{
            title: 'Khóa học',
            ...HeaderStyles,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
