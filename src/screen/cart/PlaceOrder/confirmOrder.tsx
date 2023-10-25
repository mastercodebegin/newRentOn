//@ts-nocheck
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createRef, useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, Image, ScrollView,StyleSheet, Dimensions, TouchableOpacity, TouchableNativeFeedback, StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import CustomeButton from '../../../helper/util/CustomeButton';
import { heightFromPercentage, scaledSize } from '../../../helper/util/Utilities';
import { COLORS, FONTS } from '../../../utilits/GlobalAssets';
import { rightArrow } from '../../../utilits/GlobalImages';
const width = Dimensions.get('window').width;


const ConfirmScreen = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
             <StatusBar backgroundColor='#81eed2' />
               <View style={[{ marginTop: scaledSize(0) }]}>
                <LinearGradient colors={['#81eed2', '#74d5bb']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../../assets/images/drawable/left-arrow.png')} resizeMode='contain' style={{ width: scaledSize(20), height: scaledSize(25) }} />
                    </TouchableOpacity>
                </LinearGradient>
                <View style={{ margin: scaledSize(16), width: '100%',borderBottomWidth:0,padding:scaledSize(15),marginTop:scaledSize(0),elevation:1 }}>
                    <Text style={{ fontSize: scaledSize(15),width:'80%' }}>One-time password required at time of delivery</Text>
               <TouchableOpacity style={{position:'absolute',right:scaledSize(40),top:scaledSize(25)}}>
               <Image source={rightArrow} style={{width:scaledSize(15),height:scaledSize(15)}}/>
               </TouchableOpacity>
                </View>
            </View>

            <View style={{width:'90%',alignSelf:'center',padding:scaledSize(15),elevation:1,zIndex:1,borderWidth:0,borderRadius:8}}>
                <Text style={{color:'grey',borderBottomWidth:.5,borderColor:'grey',paddingBottom:scaledSize(13)}}>Shipping to:{`  `}  
                <Text style={{color:'black',fontWeight:'bold',letterSpacing:.5}}>
                      {route?.params?.data?.adress.substring(0,25) + "..."}
                    </Text>
                    </Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:scaledSize(10)}}>
<Text style={{color:'grey'}}>Items: </Text>
<Text style={{color:'grey'}}>&#8377;{route?.params?.price}</Text>

                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:scaledSize(10)}}>
<Text style={{color:'grey'}}>Delivery: </Text>
<Text style={{color:'grey'}}>&#8377;0</Text>

                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:scaledSize(10)}}>
<Text style={{color:'grey'}}>Total: </Text>
<Text style={{color:'grey'}}>&#8377;{route?.params?.price}</Text>

                    </View>



                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:scaledSize(10)}}>
<Text style={{color:'grey'}}>Promotion Applied: </Text>
<Text style={{color:'grey'}}>&#8377;0</Text>

                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:scaledSize(18),borderBottomWidth:.5,paddingBottom:scaledSize(15),borderBottomColor:'grey'}}>
<Text style={{fontSize:16,fontWeight:'bold'}}>Order Total: </Text>
<Text style={{fontSize:16,fontWeight:'200',}}>&#8377;{route?.params?.price}</Text>

                    </View>

                    <View style={{marginLeft:scaledSize(0),marginTop:scaledSize(10)}}>
                        <Text style={{color:'red',fontWeight:'bold'}}>Your Savings: &#8377;340 (15%)</Text>
                        <Text style={{marginLeft:scaledSize(30),fontSize:21,top:scaledSize(5)}}>&bull;{`  `}
<Text style={{left:scaledSize(15),fontSize:15,top:scaledSize(-5)}}>
    Free Delivery
</Text>
</Text>
<Text style={{marginLeft:scaledSize(30),fontSize:21,top:scaledSize(5)}}>&bull;{`  `}
<Text style={{left:scaledSize(15),fontSize:15}}>
      Item discount
</Text>
</Text>
<TouchableOpacity style={{position:'absolute',right:scaledSize(0),top:scaledSize(45)}}>
               <Image source={rightArrow} style={{width:scaledSize(15),height:scaledSize(15)}}/>
               </TouchableOpacity>
                    </View>


            </View>




         <View style={[styles.loginButton]}>
                        <CustomeButton text={{ color: COLORS.black, fontSize: scaledSize(15) }} style={styles.logButton} name={`Place Your Order and Pay`} onPress={() => navigation.navigate('Payment')} />
</View>

<View style={{borderTopWidth:5, width:scaledSize(130),alignSelf:'center',marginTop:scaledSize(55),borderRadius:2}}>
<Text></Text>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    loginButton: { width: '95%', alignSelf: 'center', marginTop: scaledSize(10), marginBottom: scaledSize(10) },
    logButton: {
        height: heightFromPercentage(8),
        backgroundColor: COLORS.cartYellow,
        marginTop: scaledSize(26),
        borderRadius: scaledSize(8),
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
    },
    linearGradient: {
        //flex: 1,
        top: scaledSize(0),
        padding: scaledSize(12),
        paddingBottom: scaledSize(12),
        borderRadius: 1,
        elevation: 0,
    },
})

export default ConfirmScreen;
