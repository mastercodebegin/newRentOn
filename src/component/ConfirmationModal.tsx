import React from "react";
import { View, StyleSheet, TouchableOpacity, Modal, Text } from "react-native";
import { scaledSize } from '../helper/util/Utilities';
import { COLORS, Fonts } from "../utilits/GlobalAssets";
import { Button } from "react-native-paper";

interface S{
  onPressNo:()=>any
  onPressYes:()=>any
  isVisible:boolean

}
 const ConfirmationModal = (props: S) => {
  return (
    <View>
    <Modal
    visible={props.isVisible}
    transparent={true}
    //presentationStyle={"overFullScreen"}
    animationType={'fade'}
  >
    <View style={{
      flex: 1,
      flexDirection: 'column',
      backgroundColor: COLORS.modalBlack,
      //opacity: .7,
      //borderRadius: scaledSize(20),
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <View style={{
        width: scaledSize(300),
        backgroundColor: COLORS.white,
        opacity: 0.9,
        // borderRadius: scaledSize(10),
        height: scaledSize(100)
      }}>
        <View style={{ backgroundColor: 'white', borderRadius: scaledSize(10), height: scaledSize(100) }}>
          <Text style={{ margin: scaledSize(10), fontSize: scaledSize(16), textAlign: 'center',fontFamily:Fonts.regular }}>
            Do you want to Continue?</Text>
          <View style={{ flex: 1,flexDirection:'row' }}>
            
            <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
            <Button mode="text" style={{width:80}} onPress={props.onPressNo}>No</Button>
            </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Button mode="text" style={{width:100}} onPress={props.onPressYes} >Yes</Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
     flexDirection: "row",
    backgroundColor: COLORS.white
    // elevation: 4,
    // backgroundColor: COLORS.white,
    // // backgroundColor: COLORS.white,
    // shadowColor: COLORS.primaryShadow,
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.9,
    // shadowRadius: 8,
    
    // width: "100%",
  },
});

export default ConfirmationModal;


