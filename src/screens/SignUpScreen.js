import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import Svg, {Path} from 'react-native-svg'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from  'react-native-vector-icons/MaterialIcons'

const {width} = Dimensions.get('window');

const SignUpScreen = () => {
   const navigation = useNavigation();
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [secure, setSecure] = useState(true);

  const handleSignUp = async () => {

      if(!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()){
    Alert.alert('Error', 'Please fill in all the fields');
    return;
   }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if(!emailRegex.test(email)){
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    if(password.length < 6){
      Alert.alert('Weak Password', 'Password must be at least 6 characters long');
      return;
    }

    const user = {firstName, lastName, email, password};
    await AsyncStorage.setItem('user', JSON.stringify(user));
    await AsyncStorage.setItem('isLoggedIn', 'true');
    Alert.alert ('Success', 'Account Created');
    navigation.replace('Home')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <KeyboardAvoidingView behavior ={Platform.OS === 'ios' ? 'padding' : 'undefined'}
        style={{flex:1}}>
          {/* Top Section */}
          <View style = {styles.topSection}>
            <LinearGradient colors={['#6c63ff', '#7f75f0']} style={styles.gradient}>
              <Image source={require('../assets/profile.png')} style={styles.image}/>
              <Text style={styles.heading}> Create an Account</Text>
            </LinearGradient>

             <Svg height="70" width="100%" viewBox={`0 0 ${width} 70`} style={styles.svgCurve}>
                <Path
                  fill="#fff"
                  d={`M0,0 C${width * 0.25},70 ${width * 0.75},0 ${width},60 L${width},70 L0,70 Z`}
                />
              </Svg>
          </View>

          {/* Form Section */}
          <View style={styles.form}>

            <View style={styles.inputWrapper}>
              <Icon name='person' size={20} color="#6c63ff" style={styles.icon} />
              <TextInput
               style={styles.input}
               value={firstName}
               onChangeText={setFirstName}
               placeholder='First Name'
               placeholderTextColor='#aaa'
               />
            </View>

            <View style={styles.inputWrapper}>
              <Icon name='person' size={20} color="#6c63ff" style={styles.icon} />
              <TextInput
               style={styles.input}
               value={lastName}
               onChangeText={setLastName}
               placeholder='Last Name'
               placeholderTextColor='#aaa'
               />
            </View>

              <View style={styles.inputWrapper}>
              <Icon name='email' size={20} color="#6c63ff" style={styles.icon} />
              <TextInput
               style={styles.input}
               value={email}
               onChangeText={setEmail}
               placeholder='Email'
               placeholderTextColor='#aaa'
               keyboardType='email-address'
               autoCapitalize='none'
               />
            </View>

             <View style={styles.inputWrapper}>
              <Icon name='lock' size={20} color="#6c63ff" style={styles.icon} />
              <TextInput
               style={styles.input}
               value={password}
               onChangeText={setPassword}
               placeholder='Password'
               placeholderTextColor='#aaa'
               secureTextEntry={secure}
               />
               <TouchableOpacity onPress={() => setSecure(!secure)}>
                <Icon name={secure ? 'visibility-off' : 'visibility'}
                size={20}
                color="#6c63ff"
                />
               </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.switchText}>Already have an account? Sign In</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      {/* Dcorative Dots */}

      <View style={styles.dots}>
        <View style={[styles.dot, {backgroundColor: '#ff5f5f', left:20, top:20}]} />
        <View style={[styles.dot, {backgroundColor: '#4cc9f0', right:25, top:100}]} />
        <View style={[styles.dot, {backgroundColor: '#f9c74f', left:70, bottom:60}]} />
        <View style={[styles.dot, {backgroundColor: '#43aa8b', right:60, bottom:80}]} />
      </View>
    </SafeAreaView>
  )
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#fff'
  },
  
  topSection:{
    backgroundColor:'#6c63ff',
    position:'relative',
    zIndex:1,
  },

  gradient:{
    height:220,
    alignItems: 'center',
    justifyContent:'center',
  },

  svgCurve: {
    position:'absolute',
    bottom:-1
  },

  image:{
    width:70,
    height:70,
    marginBottom:10
  },

  heading:{
    color:'#fff',
    fontSize:24,
    fontWeight:'bold',
  },

  form:{
    marginTop:60,
    paddingHorizontal:30
  },

  inputWrapper:{
    flexDirection:'row',
    alignItems: 'center',
    borderWidth:1,
    borderColor:'#ddd',
    backgroundColor:'#f5f5f5',
    borderRadius:25,
    paddingHorizontal:15,
    marginBottom:15,
  },

  icon:{
    marginRight:10
  },

  input:{
    flex:1,
    paddingVertical:12,
    fontSize:15,
    color:'#000'
  },

  button:{
    backgroundColor:'#6c63ff',
    paddingVertical:14,
    borderRadius:25,
    alignItems: 'center',
    marginTop:20,
    elevation:4,
    shadowColor:'#6c63ff',
    shadowOpacity:0.4,
    shadowOffset:{width:0, height:2},
    shadowRadius:5
  },

  buttonText:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:16,
  },

  switchText:{
    marginTop:25,
    textAlign:'center',
    color:'#6c63ff',
    fontWeight:'bold',
    fontSize:14
  },

  dots:{
    position:'absolute',
    width:"100%",
    height:"100%"
  },

  dot:{
    position:'absolute',
    width:10,
    height:10,
    borderRadius:5,
    opacity:0.4
  }
  
})