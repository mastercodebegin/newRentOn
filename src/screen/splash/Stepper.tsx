//@ts-nocheck
import React, { Component } from 'react'
import {  Image, StatusBar, StyleSheet, Text,TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements'
import CustomeButton from '../../helper/util/CustomeButton'
import { scaledSize } from '../../helper/util/Utilities'
import { COLORS } from '../../utilits/GlobalAssets';
import { styles } from './StepperStyle'
import { sliderImage, sliderImage2, swipe1, swipe2, swipe3 } from '../../utilits/GlobalImages';

interface S {
  screenPosition: number;
}
export interface Props {
  navigation: any;
  id: string;

}
interface SS {
  // Customizable Area Start
  id: any;
  swiper: any


  // Customizable Area End
}

export default class Stepper extends React.Component<Props,S,SS> {
  swiper: React.RefObject<any>;
  constructor(props: any) {
    super(props)
    this.swiper = React.createRef()
    this.state = {
      screenPosition: 0
    }

  }
  updateIndex =  () => {
    console.log('index updated');
    this.setState({ screenPosition: this.state.screenPosition < 2 ? this.state.screenPosition + 1 : 0 })

  }

  render() {
    return (
      <View style={styles.wrapper}>
        <StatusBar backgroundColor={COLORS.white} />
        <View style={{ flex: 1, }}>
          <Swiper autoplayDirection={false}
            index={this.state.screenPosition}
            paginationStyle={{bottom:scaledSize(21)}}
            dotStyle={{backgroundColor:COLORS.grey}}
            activeDotStyle={{ width: scaledSize(8), height: scaledSize(8) }}
            loop={false}
            activeDotColor={COLORS.activeBorderColor}
            showsButtons={false}
            onIndexChanged={(index)=>{
              this.setState({screenPosition:index})
            }}
            ref={this.swiper}
          >
            <View style={[styles.slide1]}>
            <View style={[styles.slideChildView]}>
                {/* <TouchableWithoutFeedback onPress={() => {  this.swiper.current.scrollBy(2),this.setState({screenPosition:2}) }}>
                  <Text style={styles.skipText}>SKIP</Text>
                </TouchableWithoutFeedback> */}
              </View>
              <View>
                <Image source={sliderImage} resizeMode='contain' resizeMethod='auto' style={[styles.image,{alignSelf:'center',resizeMode:'contain',bottom:scaledSize(40)}]}  />
              </View>
              <View style={styles.swipe1View}>
                <Text style={styles.swipe1Text1}>Add of Account & Manage</Text>
                <Text style={styles.swipe1Text2}></Text>
                <Text style={styles.swipe1Text3}>
                  Lorem ipsum is a simply dummy test of the printing & typesetting industry
                </Text>
              </View>
            </View>


            <View style={[styles.slide2]}>
            <View style={[styles.slideChildView]}>
            {/* <TouchableWithoutFeedback onPress={() => {  this.swiper.current.scrollBy(2),this.setState({screenPosition:2}) }}>
                  <Text style={styles.skipText}>SKIP</Text>
                </TouchableWithoutFeedback> */}
              </View>
              <View>
                <Image source={sliderImage2} style={[styles.image,{alignSelf:'center'}]} resizeMode='contain' />
              </View>
              <View style={styles.swipe2View}>
              <Text style={styles.swipe1Text1}>Track your Activity</Text>
                <Text style={styles.swipe1Text2}></Text>
                <Text style={styles.swipe2Text3}>
                  Lorem ipsum is a simply dummy test of the printing & typesetting industry
                </Text>
              </View>
            </View>


            <View style={[styles.slide2]}>
            <View style={[styles.slideChildView]}>
              </View>
              <View>
                <Image source={sliderImage} style={[styles.image,{alignSelf:'center'}]} resizeMode='contain'/>
              </View>
              <View style={styles.swipe2View}>
              <Text style={styles.swipe1Text1}>Make Online Payment enjoy</Text>
                <Text style={styles.swipe1Text2}></Text>
                <Text style={styles.swipe2Text3}>
                  Lorem ipsum is a simply dummy test of the printing & typesetting industry
                </Text>
              </View>
     
           
            </View>



          </Swiper>
        </View>
        <View style={{
          flex: .15,
          width: '80%',
          

        }}>
          { this.state.screenPosition !== 2 ?
          <View style={{flexDirection:'row',justifyContent:'space-between',top:scaledSize(-38)}}>  
              <TouchableOpacity onPress={async () => {
          this.swiper.current.scrollBy(-1)
          }} style={{height:scaledSize(40),width:scaledSize(100), borderRadius:scaledSize(4),right:scaledSize(8),
            backgroundColor:this.state.screenPosition > 0 ?COLORS.white:'white',
            justifyContent:'center',alignItems:'center',bottom:scaledSize(12)}}>
          <Text style={[styles.nextText]}>{this.state.screenPosition > 0 ? 'Back' : ''}</Text>
        </TouchableOpacity>
           <TouchableOpacity onPress={async () => {
          this.swiper.current.scrollBy(1)
          }} style={{height:scaledSize(40),width:scaledSize(100), borderRadius:scaledSize(4),left:scaledSize(8),
          backgroundColor:COLORS.white,justifyContent:'center',alignItems:'center',bottom:scaledSize(12)}}>
          <Text style={[styles.nextText,{color:COLORS.activeBorderColor,fontSize:14,letterSpacing:1}]}>NEXT</Text>
        </TouchableOpacity>
           
          </View>
    :
    <View style={{flexDirection:'row',justifyContent:'space-between',top:scaledSize(-38)}}>  
    <TouchableOpacity onPress={async () => {
       this.swiper.current.scrollBy(-1)
    }} style={{height:scaledSize(40),width:scaledSize(100), borderRadius:scaledSize(4),right:scaledSize(8),
      backgroundColor:this.state.screenPosition > 0 ?COLORS.white:'white',
      justifyContent:'center',alignItems:'center',bottom:scaledSize(12)}}>
    <Text style={styles.nextText}>Back</Text>
    
  </TouchableOpacity>
  <TouchableOpacity onPress={async () => {
      this.props.navigation.navigate('Login'),
     await AsyncStorage.setItem('keys', 'seen') 
    }} style={{height:30,width:60,}}>
          <Text style={[styles.nextText,{color:COLORS.activeBorderColor,fontSize:14,letterSpacing:1}]}>FINISH</Text>
        </TouchableOpacity>
    {/* <CustomeButton  text={styles.customButton} style={styles.view} name='GET STARTED'  onPress={async () => {
      this.props.navigation.navigate('Login'),
     await AsyncStorage.setItem('keys', 'seen') 
    }}/> */}
  </View>
  }
       
        </View>
      </View>

    )
  }
}


