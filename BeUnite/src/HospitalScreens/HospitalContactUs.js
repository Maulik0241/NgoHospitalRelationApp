import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';

const HospitalContactUs = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [orgtype, setOrgtype] = useState('ngo');
  const [token, setToken] = useState('');
  const [errormsg, setErrorMsg] = useState('');

  const handleFormSubmit = async () => {
    if (!name || !email || !message) {
      setErrorMsg('All fields are required');
      return false;
    } else {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
      const endpoint = `http://10.0.2.2:3000/ngo/contactus`;
      const request = {
        orgtype,
        name,
        email,
        message,
      };
      try {
        const response = await axios.post(endpoint, request, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(token);
        console.log(response.data);
        if (response.data.error) {
          setErrorMsg(response.data.error);
        } else {
          console.log(response.data);
          alert('Thank you for Contacting Us');
          navigation.navigate("HospitalMore");
        }
      } catch (err) {
        console.log({err: 'Failed send message '});
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        onPressIn={()=>setErrorMsg(null)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        onPressIn={()=>setErrorMsg(null)}

      />
      <TextInput
        style={[styles.messageInput, {height: 200}]}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline={true}
        onPressIn={()=>setErrorMsg(null)}
      />
      {errormsg ? <Text style={styles.errormsg}>{errormsg}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  messageInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errormsg: {
    color: 'red',
    fontWeight:'bold',
    width: '80%',
    fontSize: 15,
    textAlign: 'center',
    padding: 5,
    borderRadius: 10,
    marginBottom:10,
  },
});

export default HospitalContactUs;
