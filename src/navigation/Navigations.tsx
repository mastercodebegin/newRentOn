import React from 'react'
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'


import Login from '../screen/login/Login';
import SignUp from '../screen/signup/SignUp';
import ForgotPassword from '../screen/forgot/ForgotPassword';
import BottomTabNavigator from './BottomTabNavigator';
import StackNavigator from './StackNavigator';
import FlashMessage from 'react-native-flash-message';



 
export default Navigation = () => {

  return (
    <NavigationContainer>
      <StackNavigator/>  
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}

