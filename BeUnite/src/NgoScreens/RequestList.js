import { StyleSheet, Text, View, Card, ScrollView,ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const RequestStatus = ({navigation})=> {
  const [requests, setRequests] = useState([]);
  const [token,setToken] = useState('');
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const RequestList = async()=>{
    const token = await AsyncStorage.getItem('token');
    setToken(token);
    const endpoint = `http://10.0.2.2:3000/hospital/request-status`;
    try{
      const response = await axios.get(endpoint,{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      })
      console.log(response.data);
      setRequests(response.data);
      setIsLoading(false);
    }catch(err){
      console.log({err:"Don't get Data From Hospital Request"});
    }
  }
  RequestList();
  }, []);

  return (
    <SafeAreaView style={{flex:1  }}>
    <ScrollView styles={{ backgroundColor: '#FFFFF', flex: 1 }}>
    {isLoading ? ( // render ActivityIndicator while loading
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
    <View style={styles.container}>
      {requests.map((request) => (
        <View key={request._id} style={styles.card}>
          <View style={styles.content}>
            <Text style={styles.title}>{request.hospitalName}</Text>
            <Text style={styles.text}>Subject: {request.subject}</Text>
            {request.helpFor === 'Patient' && (
              <Text style={styles.text}>Patient Name: {request.patientName}</Text>
            )}
            <Text style={styles.text}>Request Date: {new Date(request.requestDate).toLocaleDateString()}</Text>
            <Text style={styles.status}>{request.status}</Text>
            <Text style={styles.showmore} onPress={()=>navigation.navigate('ShowFullRequest', { request: request })}> Show More</Text>
          </View>
        </View>
      ))}
    </View>
      )}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  card: {
    margin: 10,
    padding: 10,
    width: '90%',
    maxWidth: 400,
    backgroundColor:'#ffff',
  },
  content: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    textAlign: 'center',
    justifyContent:'center',
  },
  showmore:{
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    textAlign: 'center',
    justifyContent:'center',
    color:'#77A7FF',
  },
  loading: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 300,
    fontSize: 40,
    borderRadius: 5,
  },
});


export default RequestStatus;
