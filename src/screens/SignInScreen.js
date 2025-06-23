import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, Dimensions } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Svg, {Path}  from 'react-native-svg'
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    if(!email || !password){
      Alert.alert('Validation error', 'Email and Password are required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if(!emailRegex.test(email)){
      Alert.alert('Validation Error', 'Please enter a valid email');
    }

    if(password.length <6){
      Alert.alert('Validation Error', 'Password must be at least 6 characters');
      return;
    }

    try{
      const userData = await AsyncStorage.getItem('user');
      const storedUser = JSON.parse(userData);

      if(storedUser &&
        email === storedUser.email && password === storedUser.password
      ) {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        Alert.alert('Success', 'Signed in Successfully');
        navigation.replace('Home');
      } else {
        Alert.alert('Error', 'Invalid email or password')
      }
    } catch (error) {
      Alert.alert('Error', 'An error occured during Sign-in');
      console.error(error)
    }
  };
  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.gradient}>
          <Image source={require('../assets/profile.png')} style={styles.image} />
        </View>
         <Svg height="70" width="100%" viewBox={`0 0 ${width} 70`} style={styles.svgCurve}>
            <Path
              fill="#fff"
              d={`M0,0 C${width * 0.25},70 ${width * 0.75},0 ${width},60 L${width},70 L0,70 Z`}
            />
         </Svg>
      </View>
      {/* Form Section */}
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#888" style={styles.inputIcon} />
          <TextInput
           placeholder='Email'
           value={email}
           onChangeText={setEmail}
           style={styles.inputField}
           keyboardType='email-address'
           autoCapitalize='none'
           />
        </View>

         <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
          <TextInput
           placeholder='Password'
           value={password}
           onChangeText={setPassword}
           style={styles.inputField}
           secureTextEntry={!showPassword}
           />
           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
            name = {showPassword ? 'visibility-off' : 'visibility'}
            size={20}
            color="#888"
            style={styles.eyeIcon}
            />
           </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Decorative Dots */}
      <View style={styles.dots}>
        <View style={[styles.dot, {backgroundColor: '#ff5f5f', left:20, top:20}]} />
        <View style={[styles.dot, {backgroundColor: '#4cc9f0', right:25, top:100}]} />
        <View style={[styles.dot, {backgroundColor: '#f9c74f', left:70, bottom:60}]} />
        <View style={[styles.dot, {backgroundColor: '#43aa8b', right:60, bottom:80}]} />
      </View>
    </View>
  )
}

export default SignInScreen;


const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#fff',
  },

  topSection:{
    backgroundColor:'#6c63ff',
    position:'relative'
  },

  gradient:{
    height:180,
    justifyContent:'center',
    alignItems: 'center',
  },

  image:{
    width:80,
    height:80,
    borderRadius:40,
    backgroundColor:"#fff",
  },

  svgCurve:{
    position:'absolute',
    bottom:'-1'
  },

  form:{
    marginTop:80,
    paddingHorizontal:20,
  },

  inputContainer:{
    flexDirection:'row',
    alignItems: 'center',
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:25,
    paddingHorizontal:10,
    marginBottom:15,
    backgroundColor:'#f9f9f9',
  },

  inputIcon:{
    marginRight:8
  },

  inputField:{
    flex:1,
    fontSize:16,
    paddingVertical:10
  },

  eyeIcon:{
    marginLeft:8
  },

  button:{
    backgroundColor:'#6c63ff',
    paddingVertical:14,
    borderRadius:25,
    alignItems: 'center',
    marginTop:10
  },

  buttonText:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:16
  },

  linkText:{
    textAlign:'center',
    marginTop:20,
    fontWeight:'bold'
  },

  dots:{
    position:'absolute',
    width:'100%',
    height:'100%',
  },

  dot:{
    position:'absolute',
    width:10,
    height:10,
    borderRadius:5,
    opacity:0.4
  }
})