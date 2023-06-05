/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from './src/LogIn&SingUp/LogIn';
import SignUp from './src/LogIn&SingUp/SignUp';
import Splash from './src/OtherSplashScreens/Splash';
import BottemTab from './src/NgoScreens/BottemTab';
import UpdateNgoProfile from './src/NgoScreens/UpdateNgoProfile';
import ShowMoreNgo from './src/NgoScreens/ShowMoreNgo';
import HospitalBottem from './src/HospitalScreens/HospitalBottem';
import ShowMoreHospital from './src/HospitalScreens/ShowMoreHospital';
import UpdateHospitalProfile from './src/HospitalScreens/UpdateHospitalProfile';
import ShowFullRequest from './src/NgoScreens/ShowFullRequest';
import HospitalContactUs from './src/HospitalScreens/HospitalContactUs';
import HospitalPolicy from './src/HospitalScreens/HospitalPolicy';
import NgoContactUs from './src/NgoScreens/NgoContactUs';
import NgoPolicy from './src/NgoScreens/NgoPolicy';
import NgoVerify from './src/NgoScreens/NgoVerify';
import HospitalVerify from './src/HospitalScreens/HospitalVerify';
import ForgetPassword from './src/LogIn&SingUp/ForgetPassword';

  const Stack = createNativeStackNavigator();

const App= ()=>{

  return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name='LogIn' component={LogIn} options={{headerShown:false}}/>
        <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name='NgoVerify' component={NgoVerify} options={{headerShown:false}}/>
        <Stack.Screen name='ForgetPassword' component={ForgetPassword} options={{headerShown:false}}/>
        <Stack.Screen name='HospitalVerify' component={HospitalVerify} options={{headerShown:false}}/>
        <Stack.Screen name= 'NgoHome' component={BottemTab} options={{headerShown:false}}/>
        <Stack.Screen name = "ShowMoreNgo" component={ShowMoreNgo} options={{headerShown:false}}/>
        <Stack.Screen name='UpdateNgoProfile' component={UpdateNgoProfile}/>
        <Stack.Screen name="ShowFullRequest" component={ShowFullRequest} options={{title:'All details'}}/>
        <Stack.Screen name="NgoContactUs" component={NgoContactUs} options={{title:'Contact Us'}}/>
        <Stack.Screen name="NgoPolicy" component={NgoPolicy} options={{title:'Privacy Policies'}}/>

        <Stack.Screen name = 'HospitalHome' component={HospitalBottem} options={{headerShown:false}}/>
        <Stack.Screen name='HospitalContactUs' component={HospitalContactUs} options={{title:'Contact Us'}}/>
        <Stack.Screen name='HospitalPolicy' component={HospitalPolicy} options={{title:'Privacy Policies' }}/>
        <Stack.Screen name = "ShowMoreHospital" component={ShowMoreHospital} options={{headerShown:false}}/>
        <Stack.Screen name = "UpdateHospitalProfile" component={UpdateHospitalProfile} options={{title:"Update Profile"}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
};


export default App;
