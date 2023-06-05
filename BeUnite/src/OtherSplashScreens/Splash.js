import React,{useState,useEffect} from "react";
import { View,Image,StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Splash({navigation}) {
    useEffect(()=>{
        setTimeout(()=>{
          AsyncStorage.getItem('contactemail').then(contactemail =>{
            console.log(contactemail , '<<<<<<<email>>>>>');
            if(contactemail !== null){
              AsyncStorage.getItem('orgType').then(orgType =>{
                console.log(orgType,'<<<<<org>>>>');
                if(orgType=='hospital'){
                  navigation.navigate('HospitalHome');
                }
                if(orgType == 'ngo'){
                  navigation.navigate('NgoHome');
                }
                
              });
    
    
            }
            else{
              navigation.navigate('LogIn');
            }
          })
        },2000);
      })
      
  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/Logo/ngo.png')} />
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: '#fff',
    },
    logo: {
      width: 100,
      height: 100,
    },
  });