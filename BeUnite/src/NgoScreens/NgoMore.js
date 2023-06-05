import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HospitalMore() {

  const navigation = useNavigation();
  const handleNavigate = (screenName) => {
    navigation.navigate(screenName);
  }

  
  const isFocus = useIsFocused();
   

  const handleLogout = async () => {
    if(isFocus){
    try {
      await AsyncStorage.removeItem('contactemail');
  
      navigation.reset({
        index: 0,
        routes: [{ name: 'LogIn' }],
      });
    } catch (error) {
      console.log(error);
    }
  };
  }

  return (
    <View style={styles.mainContainer}>
    <View style={styles.ImageContainer}>
    <Image source={require('../../assets/Logo/ngo.png')} style={styles.logo}/>
    <Image source={require('../../assets/images/BeUnite.png')} style={styles.BeUnite}/>

    </View>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleNavigate('NgoProfile')} style={styles.link}>
      <MaterialCommunityIcons name="account" color='#FFFF' size={40} style={styles.icons} />
        <Text style={styles.linkText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('NgoActivity')} style={styles.link}>
      <MaterialCommunityIcons name="note-plus" color='#FFFF' size={40} style={styles.icons} />
        <Text style={styles.linkText}>Activity</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('NgoContactUs')} style={styles.link}>
      <MaterialCommunityIcons name="phone-outgoing-outline" color='#FFFF' size={40} style={styles.icons} />
        <Text style={styles.linkText}>Contact Us</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('NgoPolicy')} style={styles.link}>
      <MaterialCommunityIcons name="file-document" color='#FFFF' size={40} style={styles.icons} />
        <Text style={styles.linkText}>Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.link}>
      <MaterialCommunityIcons name="logout" color='#FFFF' size={40} style={styles.icons} />
        <Text style={styles.linkText}>Logout</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
      flex:1,
      backgroundColor: '#FFFF',
  },
  container: {
    paddingHorizontal: 5,
  
  },
  ImageContainer:{
    backgroundColor:'#77A7FF',
    flexDirection:'row',
  },
  logo:{
    marginLeft:10,
    width:60,
    height:60,
    marginTop:4,
    backgroundColor:'#FFFF',
    borderRadius:25 ,
  },
  BeUnite:{
    marginLeft:15,
  },
  icons:{
    backgroundColor:'#77A7FF',
    borderRadius:13,
    marginRight:10,
  },
  link: {
    paddingVertical: 5,
    marginVertical: 5,
    borderBottomWidth:1,
    flexDirection:'row',
  },
  linkText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'justify',
  },
});


