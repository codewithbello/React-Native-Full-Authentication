import { View, Text, Button, Alert } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    // await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('isLoggedIn');
    // await AsyncStorage.removeItem('alreadyLaunched');

    Alert.alert('Logged Out', 'You have been logged out');
    navigation.replace('SignIn')
  }
  return (
    <View style={{flex:1, justifyContent:'center', alignItems: 'center',}}>
      <Text>Welcome To The Home Screen!</Text>
      <Button title="Logout" onPress={handleLogout}></Button>
    </View>
  )
}

export default HomeScreen