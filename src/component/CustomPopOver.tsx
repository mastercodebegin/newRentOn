import { View, Text, ScrollView,TouchableOpacity ,StyleSheet} from 'react-native'
import React, { useEffect } from 'react'
import Popover from 'react-native-popover-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomPopOver({ 
    data,
    // selected,
    from,
    isVisible,
    handleClosePopover,
    touchable}) {
        
const insets = useSafeAreaInsets();

useEffect(()=>{
    console.log("popover data---",data);
    
})

  return (
    <ScrollView>
    <View style={{backgroundColor:'yellow',height:20,width:100}}>
    <Popover
            popoverStyle={{ backgroundColor: "transparent" }}
            
            backgroundStyle={{ backgroundColor: "transparent" }}
            displayAreaInsets={insets}
            from={from}
            isVisible={isVisible}
            onRequestClose={() => handleClosePopover()}
          >
            <View>
                <Text style={{color:'black'}}>$2000</Text>
            </View>
            </Popover>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

    destinationIcon: {
        width: 250,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
})
