// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export async function requestUserPermission() {
//     console.log('requestUserPermission-------------');
    
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     getFcmToken()
//   }
// }

// export const getFcmToken=async()=>{
//     const fcmToken= await AsyncStorage.getItem('fcmToken')
//     console.log(fcmToken,'old token');
    
//     if(!fcmToken){
//         try {
//             const fcmToken = await messaging().getToken();
//             await AsyncStorage.setItem('fcmToken',fcmToken);
//            const logIn_token= await AsyncStorage.getItem('logIn_token');
//             console.log('logIn_token-----',logIn_token);
//             console.log('newtoken-----',fcmToken);
            
//         } catch (error) {
//             console.log('error---',error);
            
//         }

//     }
// }
// export const notificatioListner=async()=>{
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log('Notification caused app to open from background state:',remoteMessage.notification,)
//     })
//     messaging().onMessage(async remoteMessage=>{
//       console.log('recieved in foreground message',remoteMessage);
      
//     })
//     messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         if (remoteMessage) {
//           console.log(
//             'Notification caused app to open from quit state:',
//             remoteMessage.notification,
//           );
//           // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
//         }
//         // setLoading(false);
//       });
 
//   }
import { View, Text } from 'react-native'
import React from 'react'

export default function Notification() {
  return (
    <View>
      <Text>Notification</Text>
    </View>
  )
}