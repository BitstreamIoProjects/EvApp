import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Picker 
} from "react-native";
import { useState } from "react";
import { SelectList } from 'react-native-dropdown-select-list'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Header } from "react-native-elements";
import { FlatList } from "react-native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAllEvByIdApi } from "./EvDashApi";
import { Button } from "react-native";
import { Alert } from "react-native";

const EvDash = () => {
  const [searchText, setSearchText] = useState("");
  const [id, setId] = useState("");
  const [EvId, setEvId] = useState("");
  const [selected, setSelected] = React.useState("");
  const [token, setToken] = useState("");
  const [stations, setStations] = useState();
  const navigation = useNavigation();
  const data = [
    {key:'1', value:'2 wheeler'},
    {key:'2', value:'3 wheeler'},
    {key:'3', value:'4 wheeler'},
    // {key:'4', value:'Computers', disabled:true},

]

const onPayment = ()=>{
    Alert.alert('Make Payment', '₹200', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => navigation.navigate("Timer")},
      ]);
}

  useEffect(() => {
    AsyncStorage.getItem("id").then((value) => {
      setId(value);
    });

    AsyncStorage.getItem("token").then((value) => {
      setToken(JSON.parse(value));
    });
   
     AsyncStorage.getItem("EVid").then((value) => {
       
        setEvId((value));
                
              });

    getAllEvById();
  }, [token]);
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  const getAllEvById = async () => {
    console.warn("hi")
    var result = await getAllEvByIdApi(headers,EvId);
 
     setStations(result.data.data);
    //console.warn(result.data.data);
  };

  const viewItem = ({ item }) => {
    return (
      <View>
        <Card style={styles.card}>
          <View style={{ flexDirection: "row", paddingTop: 12 }}>
            <Text
            
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Station Name: {item.name}
                       </Text>

            
          </View>
        </Card>
      </View>
    );
  };

  return (
    <View>
      <Header>
        <Text style={{ fontSize: 15 }}>E v Stations</Text>
      </Header>
      <View>
       
      </View>
      <View>
        <FlatList
          data={stations}
          renderItem={viewItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Text></Text>
      <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
    />
    <Text></Text>
    <View>
    <TextInput  placeholder='KA-01-AB-1234'   style={styles.input}/>
    </View>
    <Button onPress={onPayment} title='Make Payment'  style={styles.btn}/>
    <View style={styles.footer}>
        <Text style={styles.footerText}>Footer</Text>
      </View>
    </View>
    
  );
};
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  btn: {
    width: '50%',
    marginTop: 10,

  },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 80,
    backgroundColor: "darkcyan",
    color: "white",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    color: "white",
  },
  editButton: {
    paddingHorizontal: 16,
  },
  editButtonText: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
  content: {
    flex: 1,
    padding: 6,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  card: {
    height: height / 13,
    zIndex: -1,
    borderWidth: 2,
    alignSelf: "center",
    width: "97%",
    marginBottom: 20,
    borderRadius: 20,
    paddingLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  footer: {
    height: 20,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    backgroundColor: "#3498DB",
    marginTop:270
  },
  footerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default EvDash;
