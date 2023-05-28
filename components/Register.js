import { View, Text,StyleSheet,TextInput,Button } from 'react-native'
import React from 'react'
import { useState } from 'react';
import {userRegistration} from './RegisterAPI'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function Register() {
  const [fname,setFname]= useState('');
  const [lname,setLname]= useState('');
  const [email,setEmail]= useState('');
  const [phone,setPhone]= useState('');
  const [password,setPassword]= useState('');
  const navigation = useNavigation();
  
  //Register
  const handleRegister = () => {
    console.warn("Reached function")
    userRegistration({
        fname:fname,
        lname:lname,
        email:email,
        phone:phone,
        password: password,       
      })
        .then((result) => {       
          if (result.status == 200) {
            console.warn("success"+result)
            AsyncStorage.setItem("token", result.data.token);
            navigation.navigate("Login");
          }
        })
        .catch((err) => {
          console.warn(err);
        });
  };

  //Redirect Login

  const handleLogin= ()=>
  {
    navigation.navigate("Login");
  }
  return (
    <View style={styles.container}>
                  <Text style={{color:'blue',fontSize:40,marginBottom:30,textAlign:'center'}}>Register</Text>

      <TextInput placeholder='Enter Fname' value={fname} onChangeText={text=>setFname(text)} style={styles.input}/>
      <TextInput placeholder='Enter Lname' value={lname} onChangeText={text=>setLname(text)} style={styles.input}/>
      <TextInput  placeholder='Enter Email' value={email} onChangeText={text=>setEmail(text)} style={styles.input}/>

<TextInput  placeholder='Enter Phone' value={phone} onChangeText={text=>setPhone(text)}  style={styles.input}/>
<TextInput  placeholder=' Enter Password' value={password} onChangeText={text=>setPassword(text)} secureTextEntry={true} style={styles.input}/>
 
<Button title='Register'  onPress={handleRegister} style={styles.btn}/>
<Text></Text>
<Button title='Login'  onPress={handleLogin} style={styles.btn}/>
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
})