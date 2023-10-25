import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { scaledSize } from "../helper/util/Utilities";
import { COLORS } from "../utilits/GlobalAssets";

interface myProps {
  title1: any;
}

const window = Dimensions.get("window");

const HeaderAccountComponent = (props: myProps) => {
  return (
    <>
      <View style={styles.semiCircleStyle} />
      <View style={styles.textView}> 
        <Text style={styles.titleInput}>{props.title1}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  semiCircleStyle: {
    //borderRadius: window.width,
    width: scaledSize(window.width * 1.9),
    height: scaledSize(window.width * 1.78),
    marginTop: scaledSize(-(window.height / 1.3)),
    marginLeft: scaledSize(-(window.width / 2.13)),
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: COLORS.lightGreen,
    justifyContent: "center",
    alignItems: "center",   
  },
  textView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: scaledSize(20),
   
    
  },
  titleInput: {
    color: COLORS.black,
    top: 0,
    position: "absolute",
    // textAlign:'center',
    letterSpacing:1,
    //fontFamily:'Quicksand-Bold',
    // marginTop:scaledSize(10),
    fontSize: scaledSize(19),
  },
  titleInput4: {
    color: "#fff",
    // textAlign:'center',
    //fontFamily:'Quicksand-Bold',
    // marginTop:scaledSize(10),
    fontSize: scaledSize(25),
    // marginBottom: scaledSize(25)
  },
});

export default HeaderAccountComponent;
