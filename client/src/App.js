import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Start from './screens/Start';
import SignUp from './screens/Auth/SignUp';
import LogIn from './screens/Auth/LogIn';

const Stack = createStackNavigator();


const App = () => {
  const [userParse, setUserParse] = useState()
  useEffect(()=> {
    AsyncStorage.getItem('user').then((user)=> {
      console.log(1, user, typeof user)
      setUserParse(JSON.parse(user))
      console.log(2, userParse, typeof userParse)
    })
  },[])
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = userParse;
    return config;
  });
  console.log(3, userParse)
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName= {userParse !== undefined ? "Start": "Login"}>
        <Stack.Screen
          name="Start"
          component={Start}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LogIn}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
