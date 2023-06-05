import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import axios from 'axios';

const ForgetPassword = ({navigation}) => {
  const [contactemail, setContactEamail] = useState('');
  const [errormsg, setErrormsg] = useState(null);
  const [emailerr, setEmailerr] = useState(null);
  const [orgType, setOrgType] = useState(null);

  const handleOrgTypeChange = value => {
    setOrgType(value);
  };

  const handleForgetPassword = async () => {
    if (contactemail === '') {
      setErrormsg('All fields are required');
      return false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(contactemail)) {
      setEmailerr('Please enter a valid email');
      return false;
    } else {
      if (orgType === 'ngo' || orgType === 'hospital') {
        const endpoint = `http://10.0.2.2:3000/${orgType}/forget-password`;
        console.log(endpoint);
        console.log(contactemail);

        try {
          const response = await axios.post(endpoint, {contactemail});
          if (response.data.error) {
            setErrormsg(response.data.error);
          } else if (response.data.message ==='Reset password mail sent you on your email') {
            if(orgType == 'hospital'){
              console.log(response.data);
              alert(response.data.message);
              navigation.navigate('LogIn');
          }else if(orgType == 'ngo'){
            console.log(response.data);
              alert(response.data.message);
              navigation.navigate('LogIn');
          }else{
            setErrormsg("Select OrgType");
          }
        }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Image source={require('../../assets/images/BeUnite.png')} />
        <Text style={styles.heading}>Forgert Password</Text>
        <Text style={styles.text}>Enter your email id for forget password</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            onPress={() => handleOrgTypeChange('ngo')}
            onPressIn={() => setErrormsg(null)}
            style={[
              styles.radio,
              {backgroundColor: orgType === 'ngo' ? '#77A7FF' : 'white'},
            ]}>
            <Text style={styles.radioLabel}>NGO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOrgTypeChange('hospital')}
            onPressIn={() => setErrormsg(null)}
            style={[
              styles.radio,
              {backgroundColor: orgType === 'hospital' ? '#77A7FF' : 'white'},
            ]}>
            <Text style={styles.radioLabel}>Hospital</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={text => setContactEamail(text)}
          onPressIn={() => setEmailerr(null)}
        />

        {errormsg ? <Text style={styles.errormsg}>{errormsg}</Text> : null}
        {emailerr ? <Text style={styles.errormsg}>{emailerr}</Text> : null}

        <TouchableOpacity onPress={handleForgetPassword} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
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
  image: {
    marginBottom: 25,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'justify',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 10,
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
  text: {
    fontSize: 17,
    marginBottom: 15,
    color: '#77A7FF',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'justify',
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
    fontWeight: 'bold',
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
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: '300',
    fontSize: 18,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif',
  },
});

export default ForgetPassword;
