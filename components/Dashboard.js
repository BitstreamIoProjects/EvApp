import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button
} from "react-native";
import { useState } from "react";
import { getAllEvstationApi } from "./DashboardApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Header } from "react-native-elements";
import { FlatList } from "react-native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Dashboard = () => {
  //const [searchText, setSearchText] = useState("");
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  const [stations, setStations] = useState("");
  const navigation = useNavigation();
  const onEvDash = (id) => {
    AsyncStorage.setItem ("EVid",JSON.stringify(id));
    console.warn(id)
    navigation.navigate("EvDash");
  };

  //Signout
  const signOut = ()=>{
    navigation.navigate("Login")
  }
  useEffect(() => {
    AsyncStorage.getItem("id").then((value) => {
      setId(value);
    });

    AsyncStorage.getItem("token").then((value) => {
      setToken(JSON.parse(value));
    });
   

    getAllEvstation();
  }, [token]);
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  const getAllEvstation = async () => {
    var result = await getAllEvstationApi(headers);
 

    setStations(result.data.data);
    console.warn(result.data.data);
  };

  const viewItem = ({ item }) => {
    return (
      <View>
        <Card style={styles.card}>
          <View style={{ flexDirection: "row", paddingTop: 12 }}>
            <Text
             onPress={()=>{onEvDash(item.id)}}
              style={{
                fontWeight: "bold",
                
              }}
            >
              <Text style={{color:'darkcyan',fontSize:20}}>STATION NAME:</Text> {item.name}
              
            </Text>

            {/* <Text
              style={{
            
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
             
             Description: {item.description}
            </Text> */}
          </View>
        </Card>
      </View>
    );
  };

  return (
    <View>
      <Header>
       
        <Button
  onPress={signOut}
  title="SignOut"
  color="#841584"
textAlign="right"
/>
<Button
    color="#841584"
textAlign="left"
title="Ev Stations"

/> 
{/* <Button
  onPress={signOut}
  title="Profile"
  color="#841584"
textAlign="right"
/> */}
      </Header>
      <View>
        <FlatList
          data={stations}
          renderItem={viewItem}
          // ListHeaderComponent={ListHeader}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 8,
},
shadowOpacity: 0.44,
shadowRadius: 10.32,

elevation: 16,
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

export default Dashboard;
