import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createRef, useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, Image, ScrollView, Dimensions, TouchableOpacity,StyleSheet, TouchableNativeFeedback, StatusBar } from 'react-native'
import HeaderComponent from '../../component/HeaderComponent';
import { heightFromPercentage, scaledSize } from '../../helper/util/Utilities';
import { Searchbar } from "react-native-paper"
import { COLORS, FONTS } from '../../utilits/GlobalAssets';
import CustomeButton from '../../helper/util/CustomeButton';
import { Delete, locationPin, minus, plus } from '../../utilits/GlobalImages';
import { useIsFocused } from "@react-navigation/core";
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const RecentScreen = ({ navigation, route }) => {
    const [cartData, setCartData] = useState([])
    const [screenPosition, setScreenPosition] = useState(0)
    const isFocused = useIsFocused();
    useEffect(()=>{
        if (isFocused) {
            values()
            //console.log(cartData)
          }
    },[isFocused])

    function removeDuplicates(originalArray:any, prop:any) {
        var newArray = [];
        var lookupObject  = {};
   
        for(var i in originalArray) {
           lookupObject[originalArray[i][prop]] = originalArray[i];
        }
   
        for(i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
         return newArray;
    }
   
    const values = async () =>{
        let value = await AsyncStorage.getItem('cart')
        let key = JSON.parse(value)
     var latestData = removeDuplicates(key,'id')
     //console.log(latestData,"dix")
    setCartData(latestData)
    }


   const renderItem = (item: any, index: number) => {
        return( <TouchableOpacity onPress={() => { }}>
      <View style={[styles.productView,{width:width}]}>

      <View style={{flexDirection:'row'}}>
      <Image resizeMethod='resize' resizeMode='contain' source={item.image} style={[styles.productImage,{borderRadius:9}]} />
      <View style={{flexDirection:'column',width:'45%',justifyContent:'center'}}>
      <Text style={[styles.productName,{marginBottom:scaledSize(15),fontSize:scaledSize(15)}]}>
        {item.name}</Text>
        <Text style={[styles.productPrice,{fontSize:19}]}>
        &#8377; {item.price * item?.qty}</Text>
                </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between', borderColor:COLORS.borderBottomColor,borderWidth:1,marginLeft:scaledSize(3),marginBottom:scaledSize(20),borderRadius:scaledSize(30),width:scaledSize(150),padding:scaledSize(3),marginTop:scaledSize(10)}}>
   <TouchableOpacity onPress={()=>{
     if(item?.qty > 1){ 
      let addData = [...cartData]
      addData.map((add:any)=>{
        if(add.id == item.id){
          return add.qty = Number(add.qty) - 1
        }
      })
      setCartData(addData)
     }
     else if(item?.qty == 1){
       return deleteItem(item)
     }
   }}>
  <Image source={minus} style={{width:scaledSize(15),height:scaledSize(15),left:scaledSize(5),top:scaledSize(3)}} resizeMode='contain'/>
</TouchableOpacity>
<Text style={{textAlign:'center',fontSize:scaledSize(17),fontWeight:'bold'}}>{item?.qty}</Text>

<TouchableOpacity onPress={()=> {
  let addData = [...cartData]
addData.map((add:any)=>{
  if(add.id == item.id){
    return add.qty = Number(add.qty) + 1
  }
})
setCartData(addData)
}}>
  <Image source={plus} style={{width:scaledSize(15),height:scaledSize(15),right:scaledSize(5),top:scaledSize(3)}} resizeMode='contain'/>
</TouchableOpacity>
   </View>
                      {/* <Image resizeMethod='resize' resizeMode='contain'  source={item.image} style={styles.productImage}/>
                      <Text style={styles.productName}>
                {item.name}</Text>
                <Text style={styles.productPrice}>
                $ {item.price}</Text> */}
                </View>
         <TouchableOpacity onPress={()=>deleteItem(item)} style={{position:'absolute',right:scaledSize(22),top:scaledSize(15)}}>
             <Image resizeMode='contain' source={Delete} style={{width:scaledSize(22),height:scaledSize(22)}}/>
         </TouchableOpacity>
        </TouchableOpacity>
     )}

     const deleteItem = async (item:any) =>{
         let data = [...cartData]
   data.map((e:any,index:number)=>{
       if(e.id == item.id){
          return data.splice(index,1)
       }
   })
   setCartData(data)
   await AsyncStorage.setItem('cart',JSON.stringify(data))
     }

const totalAmount = () =>{
  return cartData.reduce((i:any,j:any) => i + j?.price * j?.qty, 0)
}
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
               {/* <StatusBar hidden={false} backgroundColor={'#81eed2'} /> */}
               
               <View style={[{marginTop:scaledSize(0)}]}>
               <LinearGradient colors={['#81eed2', '#74d5bb', '#74d5bb']} style={styles.linearGradient}>
          <Searchbar
            //lightTheme
            //searchIcon={{ size: 20, color: COLORS.borderBottomColor }}
            //disableFullscreenUI
            placeholder="Search.."
            placeholderTextColor={COLORS.placeHolderTextColor}
            style={{width:width-scaledSize(40),marginTop:scaledSize(-5),marginBottom:scaledSize(10),borderRadius:scaledSize(6),marginLeft:scaledSize(0),zIndex:2}}
            inputStyle={{fontSize:scaledSize(18)}}
            //containerStyle={styles.searchContainerStyle}
            //inputContainerStyle={styles.searchInputStyle}
            onIconPress={()=>navigation.navigate('ProductList')}
            onKeyPress={()=>navigation.navigate('ProductList')}
            //onChangeText={()=>this.props.navigation.navigate('ProductList')}
            value={''}
          />
</LinearGradient>
</View>
<LinearGradient colors={[ '#F5F5F5','#fff']} style={{backgroundColor:'#b6f3e7',padding:scaledSize(10),top:scaledSize(-5),elevation:.5}}>
        <View style={{flexDirection:'row'}}>   
         <Image source={locationPin} resizeMode='contain' style={{width:scaledSize(18),height:scaledSize(18),top:scaledSize(2)}}/>
          <Text style={{left:scaledSize(8),fontSize:scaledSize(13),fontWeight:'100',top:scaledSize(2)}}>Delivery to harshad - Piduguralla 522413 </Text>
          </View>
        </LinearGradient>

        <ScrollView>
        <View style={{marginLeft:scaledSize(15),marginTop:scaledSize(10)}}>
        <Text style={{justifyContent:'flex-start',letterSpacing:1}}>Subtotal:
        <Text style={{fontWeight:'bold',fontSize:scaledSize(19),color:'red'}}> &#8377; {`${totalAmount()}`}</Text>
        </Text>
        </View>

        <View style={styles.loginButton}>
              <CustomeButton text={{color:COLORS.black,fontSize:scaledSize(15)}} style={styles.logButton} name={`Proceed to Buy (${cartData.length} items)`} onPress={() => { cartData.length > 0 && navigation.navigate('Address',{price:totalAmount()}) }} />
            </View>


        <View style={{marginTop:scaledSize(8),marginBottom:scaledSize(0),borderTopWidth:2,borderColor:COLORS.borderBottomColor}}>
         
            {cartData && cartData.length > 0 ?
            <FlatList
              data={cartData}
              //indicatorStyle='black'
                 numColumns={1}
                 showsHorizontalScrollIndicator={false}
                 keyExtractor={(item, index) => 'key'+index}
                 renderItem={({ item, index }) => renderItem(item, index)}
                 onEndReachedThreshold={0.5}
                 // onEndReached={() => this.onEndData()}
                 // ListFooterComponent={()=> this.footerLoader()}
            />
: <Text style={{color:COLORS.black,top:scaledSize(150),fontSize:scaledSize(18),alignSelf:'center'}}>Empty Cart</Text>
}
        </View>
        </ScrollView>
        </View>
        
    )
}


const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: COLORS.white
    },
    logButton: {
      height: heightFromPercentage(7),
      backgroundColor: COLORS.cartYellow,
      marginTop: scaledSize(26),
      borderRadius: scaledSize(8),
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      alignSelf: 'center'
  },
    loginButton: { width: '95%',alignSelf:'center', marginTop: scaledSize(-10), marginBottom: scaledSize(10) },
    linearGradient: {
      //flex: 1,
      top:scaledSize(0),
      padding: scaledSize(18),
      paddingBottom:scaledSize(6),
      borderRadius: 1,
      elevation:0,
    },
    searchBarView: { flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor:'red'
   },
    productView: {
        backgroundColor: COLORS.white,
         //borderTopWidth: 2,
         borderBottomWidth:2,
          //borderRadius: scaledSize(20),
           borderColor: COLORS.placeHolderTextColor, 
           top:scaledSize(-10),
           margin: scaledSize(10),
            //marginLeft: scaledSize(20), 
            height: scaledSize(200)
      },
      productName: {
        fontSize: scaledSize(11), textAlign: 'center', maxWidth: scaledSize(120), justifyContent: 'center', alignItems: 'center', color: COLORS.black,  marginTop: scaledSize(20), top: scaledSize(-10), marginRight: scaledSize(20), left: scaledSize(8), padding: scaledSize(1)
      },
      productPrice:{
        fontSize: scaledSize(11), 
        textAlign: 'center', 
        maxWidth: scaledSize(120),
         justifyContent: 'center',
          alignItems: 'center', 
          color: 'red',
           //fontFamily: 'Cormorant-Bold', 
            top: scaledSize(-10),
             marginRight: scaledSize(20),
              left: scaledSize(8),
               padding: scaledSize(1)
      },
      productImage:
      {
        marginTop: scaledSize(20),
        width: scaledSize(135),
        height: scaledSize(120),
        marginLeft: scaledSize(5),
        marginRight: scaledSize(5),
        alignItems: 'center'
      },
})

export default RecentScreen;
