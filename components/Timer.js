import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button ,StyleSheet ,TouchableOpacity } from 'react-native';
import { Card, Header } from 'react-native-elements';

const Time = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  
  const navigation= useNavigation()
  const handleDashboard =()=>{
    navigation.navigate("Dashboard")
  }

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
    setTotalSeconds(seconds);
  };

  const handleReset = () => {
    setSeconds(0);
    setTotalSeconds(0);
  };

  return (

    <View>
       <Header></Header>
      <Text style={{textAlign:"center",fontSize:20,marginBottom:20}}>{seconds} seconds</Text>
      <View style={styles.buttonContainer}>
        <Button title={isActive ? 'Stop' : 'Start'} onPress={isActive ? handleStop : handleStart} />
        {!isActive && (
          <Button title="Reset" onPress={handleReset} />
        )}
      </View>
      {!isActive && (
        <View >
          <Text style={{textAlign:"center",fontSize:20,marginBottom:20}}>Total Seconds:</Text>
          <Text style={{textAlign:"center",fontSize:20,marginBottom:10}}>{totalSeconds}</Text>
        </View>
        
      )}
      <View style={styles.buttonContainer}>
        <Button onPress={handleDashboard} title='Dashboard' />
      </View >
    </View>
   
  );
};
const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'column',
      marginLeft:135,
      justifyContent: 'space-between',
      width: '30%',
      marginTop: 10,
      
      
    },
  });
export default Time;
