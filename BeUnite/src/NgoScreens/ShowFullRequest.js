import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, Button, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ShowFullRequest = ({route,navigation}) => {
  const {request} = route.params;
  const [token, setToken] = useState('');
  const [status, setStatus] = useState(request.status);
  const [reasonForRejection, setReasonForRejection] = useState(
    request.reasonForRejection,
  );
  const [isApprovedPressed, setIsApprovedPressed] = useState(false);

  const handleApprove = () => {
    setStatus('Approved');
    handleSave();
    setIsApprovedPressed(true);
  }


  const handleReject = () => {
    setStatus('Rejected');
  }

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('requestId');
      const endpoint = `http://10.0.2.2:3000/ngo/edit-request/${id}`;
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const body = { status, reasonForRejection };
  
      const response = await axios.put(endpoint, body, { headers });
      console.log(response.data);
      navigation.navigate('Request');
    } catch (error) {
      console.error(error);
    }
  };


  
  return (
    <ScrollView style={{flex:1,backgroundColor:'#fff'}}>
    <View style={styles.container}>
      <Text style={styles.title}>{request.hospitalName}</Text>
      <Text style={styles.text}>Subject: {request.subject}</Text>
      <Text style={styles.text}>
        Request Date: {new Date(request.requestDate).toLocaleDateString()}
      </Text>
      <Text style={styles.text}>Help for: {request.helpFor}</Text>
      {request.helpFor === 'Patient' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Details:</Text>
          <Text style={styles.text}>Name: {request.patientName}</Text>
          <Text style={styles.text}>
            Contact Number: {request.contactNumber}
          </Text>
          <Text style={styles.text}>Address: {request.address}</Text>
        </View>
      )}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Problem Description:</Text>
        <Text style={styles.text}>{request.problemDescription}</Text>
      </View>
      <View style={styles.statusContainer}>
      <Text style={styles.statusText}>Status:</Text>
      <View style={styles.buttonContainer}>
        <Button title="Approved" onPress={handleApprove}
        color={isApprovedPressed ? 'green' : null}
         style={styles.approvedButton} />
        <Button title="Reject" onPress={handleReject} color='red' style={styles.rejectedButton} />
      </View>
      {status === 'Rejected' && (
        <View style={styles.field}>
          <Text style={styles.label}>Reason for Rejection:</Text>
          <TextInput
            style={styles.input}
            value={reasonForRejection}
            onChangeText={setReasonForRejection}
          />
        </View>
      )}
      {status !== request.status && (
        <Button title="Save" onPress={handleSave} />
      )}
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text:{
    fontSize: 18,
    marginBottom: 10
  },
  section: {
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  approvedButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  rejectedButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  statusContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  field: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'stretch',
  },
});


export default ShowFullRequest;
