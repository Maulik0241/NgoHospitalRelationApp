import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RequestForm from './RequestForm';
import RequestStatus from './RequestStatus';

const Tab = createMaterialTopTabNavigator();

export default function HospitalActivity() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Request" component={RequestForm} />
      <Tab.Screen name="Status" component={RequestStatus} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({})