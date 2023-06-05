import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';

const RequestForm = () => {
  const [token, setToken] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [subject, setSubject] = useState('');
  const [helpFor, setHelpFor] = useState('Patient');
  const [patientName, setPatientName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [problemDescription, setProblemDescription] = useState('');

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('token');
    const endpoint = `http://10.0.2.2:3000/hospital/request`;
    const request = {
      hospitalName,
      subject,
      helpFor,
      patientName,
      contactNumber,
      address,
      problemDescription,
    };
    try {
      const response = await axios.post(endpoint, request, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setHospitalName(response.data.hospitalName);
      setSubject(response.data.subject);
      setHelpFor(response.data.helpFor);
      setPatientName(response.data.patientName);
      setContactNumber(response.data.contactNumber);
      setAddress(response.data.address);
      setProblemDescription(response.data.problemDescription);
  
      await AsyncStorage.setItem('requestId', response.data._id);
      console.log(response.data._id);
      alert('Request Sent Successfully!');
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={StyleSheet.mainContainer}>
          <View style={{padding: 20}}>
            <Text style={styles.text}>Hospital Name:</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter hospital name"
              value={hospitalName}
              onChangeText={setHospitalName}
            />
            <Text style={styles.text}>Subject:</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter request details"
              value={subject}
              onChangeText={setSubject}
            />
            <Text style={styles.text}>Help For:</Text>
            <Picker
              selectedValue={helpFor}
              onValueChange={setHelpFor}
              style={{marginBottom: 20}}>
              <Picker.Item label="Patient" value="Patient" />
              <Picker.Item label="Medical" value="Medical" />
            </Picker>
            {helpFor === 'Patient' && (
              <>
                <Text style={styles.text}>Patient Name:</Text>
                <TextInput
                  style={styles.textinput}
                  placeholder="Enter patient name"
                  value={patientName}
                  onChangeText={setPatientName}
                />
                <Text style={styles.text}>Contact Number:</Text>
                <TextInput
                  style={styles.textinput}
                  placeholder="Enter contact number"
                  value={contactNumber}
                  onChangeText={setContactNumber}
                  keyboardType="phone-pad"
                />
                <Text style={styles.text}>Address:</Text>
                <TextInput
                  style={styles.textinput}
                  placeholder="Enter address"
                  value={address}
                  onChangeText={setAddress}
                />
              </>
            )}
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
              Problem Description:
            </Text>
            <TextInput
              style={{
                height: 100,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 20,
              }}
              placeholder="Enter problem description"
              value={problemDescription}
              onChangeText={setProblemDescription}
              multiline={true}
            />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  textinput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default RequestForm;
