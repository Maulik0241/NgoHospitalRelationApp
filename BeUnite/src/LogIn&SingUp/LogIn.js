import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogIn({navigation}) {
  const [orgType, setOrgType] = useState(null);
  const [fdata, setFdata] = useState({
    contactemail: '',
    password: '',
  });
  const [errormsg, setErrormsg] = useState(null);

  const handleOrgTypeChange = value => {
    setOrgType(value);
  };


  const handleLogin = async () => {
    if (fdata.contactemail == '' || fdata.password == '' || orgType == '') {
      setErrormsg('All Fields Are Requireds!');
      return false;
    } else {
      if (orgType === 'ngo' || orgType === 'hospital') {
        const endpoint = `http://10.0.2.2:3000/${orgType}/login`;

        try {
          const response = await axios.post(endpoint, fdata);
          console.log(response.data);
          alert("Login Successfully!");
          if(orgType === 'ngo'){
            AsyncStorage.setItem('contactemail',fdata.contactemail)
            AsyncStorage.setItem('orgType',orgType);
            await AsyncStorage.setItem('userId',response.data._id);
            await AsyncStorage.setItem('token', response.data.token);
            navigation.navigate('NgoHome');
          }else if(orgType === 'hospital'){
            AsyncStorage.setItem('contactemail',fdata.contactemail)
            AsyncStorage.setItem('orgType',orgType);
            await AsyncStorage.setItem('userId',response.data._id);
            console.log(response.data._id);
            await AsyncStorage.setItem('token', response.data.token);
            navigation.navigate('HospitalHome');
          }else{
            console.log("Select OrgType");
          }
        } catch (error) {
          setErrormsg("User dosen't exists", error);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/BeUnite.png')}
        style={{marginBottom: 30}}
      />

      <View style={styles.radioGroup}>
        <Text style={[styles.radioText, styles.radio]}>Log in As:</Text>
        <TouchableOpacity
          onPress={() => handleOrgTypeChange('ngo')}
          onPressIn={()=>setErrormsg(null)}
          style={[
            styles.radio,
            {backgroundColor: orgType === 'ngo' ? '#77A7FF' : 'white'},
          ]}>
          <Text style={styles.radioText}>NGO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOrgTypeChange('hospital')}
          onPressIn={()=>setErrormsg(null)}
          style={[
            styles.radio,
            {backgroundColor: orgType === 'hospital' ? '#77A7FF' : 'white'},
          ]}>
          <Text style={styles.radioText}>Hospital</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setFdata({...fdata, contactemail: text})}
        onPressIn={()=>setErrormsg(null)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setFdata({...fdata, password: text})}
        onPressIn={()=>setErrormsg(null)}
      />

      {errormsg ? <Text style={styles.errormsg}>{errormsg}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signButton}
        onPress={() => navigation.navigate('ForgetPassword')}>
        <Text style={styles.singUpText}>Forget Password</Text>
      </TouchableOpacity>
      <View style={{flexDirection:"row"}}>
      <Text style={{paddingVertical:10}}>Don't have an account?</Text>
      <TouchableOpacity
        style={styles.signButton}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.singUpText}> Sign up</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 1,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    flexShrink: 0,
    fontStyle: '',
    fontSize: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radio: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  radioText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 2,
    borderBottomColor: 'gray',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#77A7FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    // backgroundColor:'transparent',
  },
  signButton: {
    color: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '300',
    fontSize: 18,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif',
  },
  singUpText: {
    color: 'rgb(0, 149, 246)',
    fontWeight: '300',
    fontSize: 18,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif',
  },
  errormsg: {
    color: 'red',
    width: '80%',
    fontSize: 17,
    fontWeight:'bold',
    textAlign: 'center',
    padding: 5,
    borderRadius: 10,
    marginBottom:10,
  },
});
