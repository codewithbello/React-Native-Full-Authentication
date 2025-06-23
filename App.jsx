import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './src/routes/AuthStack'

const App = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkStorage = async () => {
      const alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');
      const user = await AsyncStorage.getItem('user');
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

      if(!alreadyLaunched){
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        setInitialRoute('Onboarding');
      } else if (user && isLoggedIn === 'true'){
        setInitialRoute('Home');
      } else if (user){
        setInitialRoute('SignIn')
      }else{
        setInitialRoute('SignUp')
      }
    };
    checkStorage();
  }, []);

  if(!initialRoute) return null;

  return (
    <NavigationContainer>
      <AuthStack initialRoute={initialRoute}/>
    </NavigationContainer>
  )
}

export default App