import { Button, StyleSheet, Text, TextInput, View,Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { user_Login } from './LoginApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const navigation = useNavigation();
  const handleRegister = () => {
    navigation.navigate("Register");
  };
  const handleLogin = () => {
    // Perform login action here
 user_Login({
 email:email,
 password:password

  
})
.then((result) => {
          
  
 AsyncStorage.setItem ("id",JSON.stringify(result.data.id));
   AsyncStorage.setItem("token",JSON.stringify( result.data.token));

   if (result.data.token) {
     AsyncStorage.setItem("token",JSON.stringify( result.data.token));
     
     
     navigation.replace("Dashboard");
   }
   else {Alert.alert("Bad Credentials")}
 })
 .catch((err) => {

 });
  };
 
  return (
    <View style={styles.container}>
            <Text style={{color:'blue',fontSize:40,marginBottom:30,textAlign:'center'}}>LOGIN</Text>

      <TextInput  placeholder='Entare Email' value={email} onChangeText={text=>setEmail(text)}  style={styles.input}/>
      <TextInput  placeholder=' Enter Password' value={password} onChangeText={text=>setPassword(text)} secureTextEntry={true} style={styles.input}/>
    <Button title='Login'  onPress={handleLogin} style={styles.btn}/>
    <Text></Text>
    <Button title='Register'  onPress={handleRegister} style={styles.btn}/>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  btn: {
    width: '80%',
    marginTop: 10,

  },
});
