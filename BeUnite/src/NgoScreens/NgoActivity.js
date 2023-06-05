import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RequestList from './RequestList';
import Status from './Status';

const Tab = createMaterialTopTabNavigator();

export default function NgoActivity() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Request" component={RequestList} />
      <Tab.Screen name="Status" component={Status} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({})