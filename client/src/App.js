import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import Account from './screens/Account';
import Setting from './screens/Setting';
import EditProfile from './screens/EditProfile';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tài khoản">
        <Stack.Screen
          name="Tài khoản"
          options={({ navigation }) => ({
            headerLeft: () => (
              <AntDesign
                name="arrowleft"
                size={30}
                style={{ marginLeft: 20 }}
                color="black"
                onPress={() => navigation.goBack()}
              />
            ),
            headerRight: () => (
              <AntDesign
                name="setting"
                size={30}
                style={{ marginRight: 20 }}
                color="black"
                onPress={() => navigation.navigate('Cài đặt')}
              />
            ),
          })}
          component={Account}
        />
        <Stack.Screen
          name="Cài đặt"
          options={({ navigation }) => ({
            headerLeft: () => (
              <AntDesign
                name="arrowleft"
                size={30}
                style={{ marginLeft: 20 }}
                color="black"
                onPress={() => navigation.goBack()}
              />
            ),
          })}
          component={Setting}
        />
        <Stack.Screen
          name="Chỉnh sửa tài khoản"
          options={({ navigation, route }) => ({
            headerLeft: () => (
              <AntDesign
                name="arrowleft"
                size={30}
                style={{ marginLeft: 20 }}
                color="black"
                onPress={() => {
                  navigation.goBack();
                }}
              />
            ),
            headerRight: () => (
              <Feather name="check" size={30} style={{ marginRight: 20 }} color="black" />
            ),
          })}
          component={EditProfile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
