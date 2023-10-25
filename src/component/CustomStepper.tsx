import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'
import StepIndicator from 'react-native-step-indicator'
import Icon from 'react-native-vector-icons/FontAwesome'

interface Props {
    stepCount: number,
    status:string,

}


const CustomStepper = (props:any) => {
    // var labels: Array<string>
    const labels = [""]
    // const [currentPosition,setCurrentPosition]=useState(0)
    var currentPosition = 0
    
    if(props?.data?.orderStatus=="RECIEVED"){
        currentPosition=1
        labels.splice(0,1,"CONFIRMED")
    }
    if(props?.data?.orderStatus=="DISPATCHED"){
        currentPosition=2
        labels.splice(0,1,"CONFIRMED","DISPATCHED")
    }
    if(props?.data?.orderStatus=="OUT_FOR_DELIVERY"){
        currentPosition=3
        labels.splice(0,1,"CONFIRMED","DISPATCHED","OUT_FOR_DELIVERY")
    }
    if(props?.data?.orderStatus=="DELIVERED"){
        currentPosition=4
        labels.splice(0,1,"CONFIRMED","DISPATCHED","OUT_FOR_DELIVERY","DELIVERED")
    }



    // props?.data?.orderStatus.map((item:any,index:any)=>{
    //     console.log("hello",item)
    //     if(item.RECEIVED===true){
    //         // setCurrentPosition(1)
    //         currentPosition=1
    //     labels.splice(0,1,"CONFIRMED")
    // }
    //     if(item.SHIPPED===true){
    //         labels.push("SHIPPED")
    //         // setCurrentPosition(2)
    //         currentPosition=2
    //     }
    //     if(item.OUT_FOR_DELIVERY===true){
    //         labels.push("     OUT_FOR_DELIVERY")
    //         // setCurrentPosition(3)
    //         currentPosition=3
    //     }
    //     if(item.DELIVERED===true){
    //         // setCurrentPosition(4)
    //         currentPosition=4
    //     labels.push("DELIVERED")
    //     console.log("labels---",labels)
    //     }
    // })
    // console.log("labels outer---",labels)
    // const labels = [props?.data?.orderStatus,props?.data?.orderDelivered]
    // const labels = ["Confirmed","Shipped","Out for delivery"]
const customStyles = {
  stepIndicatorSize: 25,
  
  currentStepIndicatorSize:25,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#46882c',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#46882c',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#46882c',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#46882c',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 10,
  currentStepIndicatorLabelFontSize: 10,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}



useEffect(()=>{
    console.log("Props in Custom Stepper--",props?.data?.orderStatus)
    
},)


// const getPosition=(status:string)=>{
//     console.log("Custom Stepper Switch case---",status)
//     switch(status)
// {
//         case 'CONFIRMED':
//         return 1;
//         case 'SHIPPED':
//         return 2;
//         case 'OUT_FOR_DELIVERY':
//         return 3;
//         case 'DELIVERED':
//             console.log("Current Position----",4)
//         return 4;
//         default:
//             return 0
//     }
    

// }

// status
// Confirmed
// Shipped
// Out_for_delivery
// Delivered

    return (
    <View style={{justifyContent:'flex-start',alignItems:'flex-start'}}>
       <StepIndicator
         customStyles={customStyles}
         currentPosition={currentPosition}
         labels={labels}
         renderStepIndicator={({position,stepstatus})=>(<Icon name={props?.icons[position]} size={10} color="#fff" />)}
         stepCount={currentPosition}
        //  stepCount={props?.data?.orderStatus.length}
         direction='vertical'
         />
    </View>
  )
}

export default CustomStepper