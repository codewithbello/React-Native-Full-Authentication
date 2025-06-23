import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnboardingScreen from '../screens/OnboardingScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';

const AuthStack = ({initialRoute}) => {
  const Stack = createNativeStackNavigator();
  return (
   <Stack.Navigator initialRouteName = {initialRoute} screenOptions={{headerShown:false}}>
    <Stack.Screen name = "Onboarding" component={OnboardingScreen} />
    <Stack.Screen name = "SignUp" component={SignUpScreen} />
    <Stack.Screen name = "SignIn" component={SignInScreen} />
    <Stack.Screen name = "Home" component={HomeScreen} />
   </Stack.Navigator>
  )
}

export default AuthStack