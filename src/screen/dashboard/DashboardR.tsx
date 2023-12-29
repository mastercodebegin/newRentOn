import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Logo} from '../../assets/constants/GlobalAssests'
import Icon from 'react-native-vector-icons/FontAwesome'
import { scaledSize } from '../../helper/util/Utilities'
import { Fonts } from '../../utilits/GlobalAssets'
import { JumpingTransition } from 'react-native-reanimated'

const DashboardR = () => {
  return (
    <View style={{flex:1,backgroundColor:'red'}}>
      <View style={{flex:1,backgroundColor:'#244d73'}}>
      <View style={{flex:1}}>
        <View style={styles.logo}>
            <Image source={Logo.SignUpLogo} style={styles.logoImage} resizeMode={'center'} />
        </View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
             <View style={{flex:1,height:'100%',justifyContent:'space-evenly',paddingLeft:scaledSize(20),padding:scaledSize(5)}}>
                <View style={{}}>
                    <Text style={{fontFamily:Fonts.regular,fontSize:scaledSize(20)}}>Welcome Firoz</Text>
                </View>
                <View style={{}}>
                    <Text style={{}}>12:25pm</Text>
                    <Text>Saturday,01 Aug 2020</Text>
                </View>
             </View>
             <View style={{flex:.7,padding:scaledSize(5),justifyContent:'center',alignItems:'center'}}>
                <Image source={Logo.SignInLogo} style={styles.profileImage} resizeMode={'center'} />
            </View>   
        </View>
      </View>
      </View>
      <View style={{flex:1,backgroundColor:'#fff',}}>
        <View style={{flex:.1,backgroundColor:'#fff',padding:scaledSize(5),margin:scaledSize(5)}}>
        <Text style={{fontFamily:Fonts.regular,fontSize:scaledSize(20),marginLeft:scaledSize(15),color:'#244d73'}}>What do you want to do?</Text>
        </View>
        <View style={{flex:1,backgroundColor:'#fff',padding:scaledSize(5),paddingTop:scaledSize(0),flexWrap:'wrap'}}>
            <TouchableOpacity style={styles.boxView}>
            <View style={{flex:1,}}>
                <View style={styles.iconView}>
                <Icon name='music' size={24} color='rgba(0, 0, 0, 0.5)'/>
                </View>
                <View style={{marginTop:scaledSize(35)}}>
                <Text style={styles.boxText}>Stand up</Text>
                </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxView}>
            <View style={{flex:1,}}>
                <View style={styles.iconView}>
                <Icon name='music' size={24} color='rgba(0, 0, 0, 0.5)'/>
                </View>
                <View style={{marginTop:scaledSize(35)}}>
                <Text style={styles.boxText}>Stand up</Text>
                </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxView}>
            <View style={{flex:1,}}>
                <View style={styles.iconView}>
                <Icon name='music' size={24} color='rgba(0, 0, 0, 0.5)'/>
                </View>
                <View style={{marginTop:scaledSize(35)}}>
                <Text style={styles.boxText}>Stand up</Text>
                </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxView}>
            <View style={{flex:1,}}>
                <View style={styles.iconView}>
                <Icon name='music' size={24} color='rgba(0, 0, 0, 0.5)'/>
                </View>
                <View style={{marginTop:scaledSize(35)}}>
                <Text style={styles.boxText}>Stand up</Text>
                </View>
                </View>
            </TouchableOpacity>
        </View>
      </View>
      <View style={{flex:.3,backgroundColor:'#fff'}}>
        <Text>
        </Text>
      </View>
    </View>
  )
}

export default DashboardR

const styles = StyleSheet.create({
    logo: {
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },

    logoImage: {
        // width: scaledSize(180),
        width: '90%',
        height: scaledSize(94),

    },
    profileImage: {
        width:'63%',
        height: '50%',
        borderRadius:scaledSize(50)
    },

    boxView :{
        borderRadius:scaledSize(8),
        width:'40%',
        height:'35%',
        backgroundColor:'#244d73',
        marginTop:scaledSize(20),
        justifyContent:'center',
        alignItems:'center',
        marginLeft:scaledSize(20)
    },
    boxText :{
        // marginTop:scaledSize(10),
        fontSize:18,
        fontWeight:'600',
        color:'white'
    },
    iconView :{
        position: 'absolute',
        top:-20,
        left: 15,
        backgroundColor: '#f2f2f2',
        borderRadius: 50, // Set border radius to half of the width and height for a circle
        width: 40,       // Set a fixed width for the circular view
        height: 40,      // Set a fixed height for the circular view
        alignItems: 'center',
        justifyContent: 'center',
    }
})