import { View, Text, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Onboarding from 'react-native-onboarding-swiper'

const OnboardingScreen = () => {
  const navigation = useNavigation();
  return (
   <Onboarding
    onSkip = {() => navigation.replace('SignUp')}
    onDone = {() => navigation.replace('SignUp')}

    pages = {[
      {
        backgroundColor: '#fff',
        image: <Image source={require('../assets/bird-1.png')}
        style={{width:250, height:330}}
        />,
        title: 'Welcome',
        subtitle: 'This is a beautiful onboarding Screen'
      },
       {
        backgroundColor: '#fdeb93',
        image: <Image source={require('../assets/bird-2.png')}
         style={{width:250, height:330}}
        />,
        title: 'Sign In Fast',
        subtitle: 'Easy Sign In and Sign Up flow'
      },
       {
        backgroundColor: '#e9bcbe',
        image: <Image source={require('../assets/bird-3.png')} 
         style={{width:250, height:330}}
        />,
        title: 'Get Started',
        subtitle: 'Lets get Started Now'
      },
    ]}
   />
  )
}

export default OnboardingScreen