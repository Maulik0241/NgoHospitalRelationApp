import { StyleSheet, Text, View, TextInput,Image,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HospitalVerify({ navigation,route }) {

  const { hospitalData } = route.params;
  const [errormsg,setErrormsg] = useState(null);
  const[actualCode,setActualCode] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');


  useEffect(()=>{
    setActualCode(hospitalData[0]?.VerificationCode);
},[]);


        const hospitalverify = async()=>{
          if(verificationCode ==''){
              setErrormsg("Please enter the code ");
              return;
          }
          else if(verificationCode == actualCode){
              const fdata = {
                  orgname:hospitalData[0]?.orgname,
                  contactname:hospitalData[0]?.contactname,
                  contactemail:hospitalData[0]?.contactemail,
                  contactphone:hospitalData[0]?.contactphone,
                  address:hospitalData[0]?.address,
                  password:hospitalData[0]?.password,
              }
              const endpoint = `http://10.0.2.2:3000/hospital/signup`;
              try{
                  
                  const response = await axios.post(endpoint, fdata);
                  if (response.data.error) {
                    setErrormsg(response.data.error);
                  }
                  else if(response.data.message==="User Regestered Successfully!"){
                  await AsyncStorage.setItem('token',response.data.token);
                      alert(response.data.message);
                      navigation.navigate("LogIn")
                  }
              }catch(err){
                  console.log({err:"Don't get data from database"});
              }
          }
          else if(verificationCode != actualCode){
              console.log('incorrect code');
              setErrormsg("Verification code not matched!")
          }
      }

      return (
        <SafeAreaView style={styles.mainContainer}>
        <View style={styles.container}>
          <Image source={require('../../assets/images/BeUnite.png')} />
          <Text style={styles.heading}>Verification Code</Text>
          <Text style={styles.text}>A Code has been sent to you on your email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter 6 digit verification code"
            onChangeText={(text) => setVerificationCode(text)}
            onPressIn={()=>setErrormsg(null)}
            value={verificationCode}
          />
    
        {errormsg ? <Text style={styles.errormsg}>{errormsg}</Text> : null}
    
           <TouchableOpacity onPress={hospitalverify} style={styles.button}>
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
        mainContainer:{
            flex: 1,
            backgroundColor: 'white',
          },
        container: {
            borderRadius: 1,
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            flexShrink: 0,
            fontStyle: 'inherit',
            fontSize: 100,
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          },
          image:{
            marginBottom:25,
          },
      heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign:'justify',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif',
      },
      text:{
        fontSize: 17,
        marginBottom: 15,
        color:'#77A7FF',
        fontWeight: '700',
        fontSize: 18,
        textAlign:'justify',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif',
      },
      input: {
        height: 50,
        width: '80%',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        justifyContent: 'center',
      },
      errormsg: {
        width: '80%',
        color: 'red',
        fontSize: 17,
        fontWeight:'bold',
        textAlign: 'center',
        padding: 5,
        borderRadius: 10,
      },
      button: {
        backgroundColor: '#77A7FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        // backgroundColor:'transparent',
        marginTop:15,
      },
      buttonText: {
        color: 'white',
        fontWeight: '300',
        fontSize: 18,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif',
      },
    });