import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import EvDash from './EvDash'
import Timer from './Timer';






const Stack = createStackNavigator();

function Navigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} >
      <Stack.Screen name="Login" component={Login}  />
      <Stack.Screen name="Register" component={Register}  />
      <Stack.Screen name="Dashboard" component={Dashboard}  />
      <Stack.Screen name="EvDash" component={EvDash}  />
      <Stack.Screen name="Timer" component={Timer} />



      </Stack.Navigator>
  );
}

export default Navigation