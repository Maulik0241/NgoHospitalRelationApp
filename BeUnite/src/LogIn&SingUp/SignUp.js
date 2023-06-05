import React, {useState} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({navigation}) {
  const [orgType, setOrgType] = useState(null);

  const handleOrgTypeChange = value => {
    setOrgType(value);
  };

  const [fdata, setFdata] = useState({
    orgname: '',
    contactname: '',
    contactemail: '',
    contactphone: '',
    address: '',
    password: '',
    cpassword: '',
  });

  const [errormsg, setErrormsg] = useState(null);
  const [emailerr, setEmailerr] = useState(null);
  const [nameerr, setNameerr] = useState(null);
  const [orgerr, setOrgerr] = useState(null);
  const [passerror, setPasserror] = useState(null);
  const [cpasserr, setCperr] = useState(null);
  const [phoneerr, setPhoneerr] = useState(null);

  const sendBackend = async () => {
    if (
      fdata.orgname === '' ||
      fdata.contactname === '' ||
      fdata.contactemail === '' ||
      fdata.contactphone === '' ||
      fdata.address === '' ||
      fdata.password === '' ||
      fdata.cpassword === ''
    ) {
      setErrormsg('All fields are required');
      return false;
    } else if (
      !/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(fdata.orgname)
    ) {
      setOrgerr('Please enter valid orginization name');
      return false;
    } else if (
      !/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(fdata.contactname)
    ) {
      setNameerr('Please enter valid name');
      return false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(fdata.contactemail)) {
      setEmailerr('Please enter valid email');
      return false;
    } else if (fdata.password !== fdata.cpassword) {
      setCperr('Password and Confirm Password must be the same!');
      return false;
    } else if (fdata.contactphone.length != 10) {
      setPhoneerr('Please enter valid phone number');
      return false;
    } else {
      if (orgType === 'ngo' || orgType === 'hospital') {
        const endpoint = `http://10.0.2.2:3000/${orgType}/verify`;

        try {
          const response = await axios.post(endpoint, fdata);
          if (response.data.error) {
            setErrormsg(response.data.error);
          } else if (
            response.data.message === 'Verification code sent to your email'
          ) {
            if (orgType == 'ngo') {
              console.log(response.data.ngodata);
              alert(response.data.message);
              navigation.navigate('NgoVerify', {
                ngoData: response.data.ngodata,
              });
            } else if (orgType == 'hospital') {
              console.log(response.data.hospitaldata);
              alert(response.data.message);
              navigation.navigate('HospitalVerify', {
                hospitalData: response.data.hospitaldata,
              });
            }
          }
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/BeUnite.png')}
          style={{marginBottom: 20}}
        />
        <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
          WelCome to BeUnite
        </Text>
        {errormsg ? <Text style={styles.errormsg}>{errormsg}</Text> : null}
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
          placeholder="Organization Name"
          value={fdata.orgname}
          onChangeText={text => setFdata({...fdata, orgname: text})}
          onPressIn={() => setOrgerr(null)}
          style={styles.input}
        />
        {orgerr ? <Text style={styles.emailerr}>{orgerr}</Text> : null}
        <TextInput
          placeholder="Name"
          value={fdata.contactname}
          onChangeText={text => setFdata({...fdata, contactname: text})}
          onPressIn={() => setNameerr(null)}
          style={styles.input}
        />
        {nameerr ? <Text style={styles.emailerr}>{nameerr}</Text> : null}
        <TextInput
          placeholder="Email"
          value={fdata.contactemail}
          onChangeText={text => setFdata({...fdata, contactemail: text})}
          onPressIn={() => setEmailerr(null)}
          style={styles.input}
          keyboardType="email-address"
        />
        {emailerr ? <Text style={styles.emailerr}>{emailerr}</Text> : null}
        <TextInput
          placeholder="Phone"
          value={fdata.contactphone}
          onChangeText={text => setFdata({...fdata, contactphone: text})}
          onPressIn={() => setPhoneerr(null)}
          style={styles.input}
          keyboardType="phone-pad"
        />
        
        {phoneerr ? <Text style={styles.emailerr}>{phoneerr}</Text> : null}
        <TextInput
          placeholder="Address"
          value={fdata.address}
          onChangeText={text => setFdata({...fdata, address: text})}
          onPressIn={() => setErrormsg(null)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={fdata.password}
          onPressIn={() => setErrormsg(null)}
          onChangeText={text => setFdata({...fdata, password: text})}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm password"
          value={fdata.cpassword}
          onChangeText={text => setFdata({...fdata, cpassword: text})}
          onPressIn={() => setCperr(null)}
          style={styles.input}
          secureTextEntry
        />
        {cpasserr ? <Text style={styles.emailerr}>{cpasserr}</Text> : null}
        <TouchableOpacity onPress={sendBackend} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

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
    marginTop: 30,
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
  input: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    // borderBottomColor: 'gray',
    marginBottom: 18,
    // flexDirection:'row',
  },
  button: {
    backgroundColor: '#77A7FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    // backgroundColor:'transparent',
  },
  signButton: {
    color: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    width: '80%',
    color: 'red',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    borderRadius: 10,
  },
  emailerr: {
    width: '80%',
    color: 'red',
    fontSize: 17,
    // fontWeight:'bold',
    textAlign: 'justify',
    marginBottom: 15,
  },
});
