import { View, Text, Image,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import HeaderComponent from '../../component/HeaderComponent'
import { UrlConstants } from '../../context/service/UrlConstants'
import { numberWithCommas, scaledSize } from '../../helper/util/Utilities'
import { rupee } from '../../utilits/GlobalImages'
import { Fonts } from '../../utilits/GlobalAssets'
import StepIndicator from 'react-native-step-indicator'
import OrderUpdates from './OrderUpdates'
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomStepper from '../../component/CustomStepper'

export default function OrderDetails(props: any) {
    const { data } = props?.route?.params
    console.log("Details-----", data)
    
const icons=["check","check","check","check"]


    const getDate=(item:string)=>{
        console.log("dataString---",item)
        const dateObj = new Date(item)
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month = months[dateObj.getMonth()];
        let day = dateObj.getDay()
        let year = dateObj.getFullYear()
        // return dateObj.toString()
        if(day<10){
            let date = `${month} 0${day}, ${year}`
            return date
            }else{ 
        let date = `${month} ${day}, ${year}`
        return date
            }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#f0f1f5" }}>
            <View style={{ height: scaledSize(40), flexDirection: 'row',backgroundColor:'#fff' }}>
                <HeaderComponent title={'Order Details'} />
                <View style={{backgroundColor:'#fff', flex: .3, flexDirection: 'row', justifyContent: 'space-evenly', padding: scaledSize(10) }}>
                    <Text><Icon name="search" size={20} color="#900" /></Text>
                    <Text><Icon name="opencart" size={20} color="#900" /></Text>
                    
                </View>
            </View>
            <View style={{ flex: 1,backgroundColor:'#f0f1f5', }}>
            

                <View style={{
                    flex: .06,
                    justifyContent: 'center',
                    padding: scaledSize(5),
                    backgroundColor:'#fff',
                }}><Text style={{
                    color: 'grey',
                    fontFamily: Fonts.regular,
                }}>Order ID : {data.orderId}</Text>
                </View>
                <View style={{
                    flex: .2,flexDirection: 'row', borderBottomWidth: scaledSize(.5), borderTopWidth: scaledSize(.5), borderColor: 'lightgrey',backgroundColor:'#fff'
                }}>
                    <View style={{ flex: 1.4,padding:scaledSize(10),alignItems:'flex-start', }}>
                        
                        <Text style={{
                            fontSize: scaledSize(16),
                            maxWidth: scaledSize(200),
                            justifyContent: 'center',
                            alignItems: 'center',
                            color:'black',
                            fontFamily: Fonts.regular,
                        }}>
                            {data?.brand} {data?.productModalNumber}
                        </Text>
                        
                        <Text style={{
                            fontSize: scaledSize(14),
                            maxWidth: scaledSize(120),
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'lightgrey',
                            fontFamily: Fonts.regular,
                        }} >
                             {data?.variant?.variant?.modalColors[0]?.colorName?.color} {data?.variant?.variant?.rom} GB
                        </Text>
                        <Text style={{
                            fontSize: scaledSize(14),
                            // marginLeft:scaledSize(10),
                            maxWidth: scaledSize(120),
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'lightgrey',
                            fontFamily: Fonts.regular,
                        }} >
                            Seller : {data?.vendor?.businessName}
                        </Text>
                        <View style={{flexDirection:'row',}}>
                        <Image source={rupee} style={{ height: 14, width: 14, left: 2, top: 6, }} />
                        <Text style={{
                             color: 'black',
                            fontSize: scaledSize(18),
                            fontFamily: Fonts.regular,
                        }}>
                            {numberWithCommas(data?.price)}
                        </Text>
                        </View>
                    </View>
                    <View style={{ flex: .8,alignItems:'flex-end', }}>
                        <Image resizeMethod='resize' resizeMode='contain'
                            source={{ uri: UrlConstants.S3_BASE_URL + data.variant?.vendorProductsVariantColor[0]?.modalColors?.modalImages[0]?.imageName }}
                       style={{ marginTop: scaledSize(5),
                        width: scaledSize(115),
                        height: scaledSize(100),
                        marginLeft: scaledSize(5),
                        marginRight: scaledSize(5),
                        alignItems: 'center'}}
                       />
                    </View>

                </View>
                <View style={{ flex:.1,borderBottomWidth: scaledSize(.5)
                  ,backgroundColor:'#fff'  , borderColor: 'lightgrey',padding:scaledSize(5)}}>
                       <View style={{flex:1,flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start'}}>
                        <CustomStepper  data={data} icons={icons}/>
                        <View style={{flex:1,justifyContent:'space-around'}} >

                        {data?.orderStatus=="RECIEVED" || data?.orderStatus=="DISPATCHED" || data?.orderStatus=="OUT_FOR_DELIVERY" || data?.orderStatus=="DELIVERED" ? <Text style={{
                            fontSize: scaledSize(13),
                            color:'black',
                            fontFamily: Fonts.regular,
                            
                        }}>
                             {getDate(data?.orderDate)}
                        </Text>:null}
                        {data?.orderStatus=="DISPATCHED" || data?.orderStatus=="OUT_FOR_DELIVERY" || data?.orderStatus=="DELIVERED" ? <Text style={{
                            fontSize: scaledSize(13),
                            
                            color:'black',
                            fontFamily: Fonts.regular,
                            // marginBottom:3
                            // bottom:13
                        }}>
                             {getDate(data?.orderShippedDate)}
                        </Text>:null} 
                        {data?.orderStatus=="OUT_FOR_DELIVERY" || data?.orderStatus=="DELIVERED"  ? <Text style={{
                            fontSize: scaledSize(13),
                            
                            color:'black',
                            fontFamily: Fonts.regular,
                             marginLeft:5
                            // bottom:13
                        }}>
                             {getDate(data?.orderOutForDeliveryDate)}
                        </Text>:null} 
                        {data?.orderStatus=="DELIVERED" ? <Text style={{
                            fontSize: scaledSize(13),
                            
                            color:'black',
                            fontFamily: Fonts.regular,
                            // marginBottom:3
                            // bottom:13
                        }}>
                             {getDate(data?.orderDeliveredDate)}
                        </Text>:null} 
                        </View>
                        
         </View>
         {data?.orderStatus!=="RECEIVED" ? <View style={{padding:5}}>
                        <TouchableOpacity onPress={()=>{props.navigation.navigate('OrderUpdates',{data :data})}}>
                        <Text style={{
                            // textAlign: 'center',
                            // maxWidth: scaledSize(200),
                            justifyContent: 'center',
                            alignItems: 'center',
                            color:'black',
                            fontFamily: Fonts.regular,}}>See All Updates &gt;</Text>
                            </TouchableOpacity>
                            </View>:null}
         
         {/* <View style={{flexDirection:"column",justifyContent:'space-around'}}> */}
                {/* <Text style={{
                            fontSize: scaledSize(16),
                            // textAlign: 'center',
                            // maxWidth: scaledSize(200),
                            justifyContent: 'center',
                            alignItems: 'center',
                            color:'black',
                            fontFamily: Fonts.regular,
                            top:scaledSize(-10)
                            
                        }}>
                             {getDate(data?.orderDate)}
                        </Text> */}
                {/* {data?.orderStatus.DELIVERED ? <Text style={{
                            fontSize: scaledSize(16),
                            // textAlign: 'center',
                            // maxWidth: scaledSize(200),
                            justifyContent: 'center',
                            alignItems: 'center',
                            color:'black',
                            fontFamily: Fonts.regular,
                            bottom:13
                        }}>
                             {getDate(data?.deliveredDate)}
                        </Text>:null} */}
                        {/* </View> */}
                            
                            </View>
                            
                <View style={{backgroundColor:'#fff',}}>
                    <Text style={{
                         textAlign: 'center',color:'black',margin:scaledSize(15)}}>Need help?</Text>
                </View>
            
            <View style={{
                flex:.080,
            flexDirection:'row',
            elevation:1,
            top:10
            // justifyContent:'center'
            // ,alignItems:'center',
            }}>
                <TouchableOpacity style={{flex:1,backgroundColor:'#fff',
                flexDirection:'row',
                alignItems:'center',
                padding:scaledSize(5)}}
                onPress={()=>{props.navigation.navigate()}}>

           
                   <Text><Icon name="file" size={20} color="#900" /></Text> 
                   <Text style={{paddingLeft:scaledSize(20),fontSize:18}}>Invoice Download</Text>
                <Text style={{position:'absolute',right:15}}><Icon name="angle-right" size={18} color="#900" /></Text>
                </TouchableOpacity>
            </View>
            </View>

        </View>
    )
}