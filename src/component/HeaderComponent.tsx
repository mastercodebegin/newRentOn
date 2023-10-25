import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import { scaledSize } from "../helper/util/Utilities";
import { COLORS, Fonts } from "../utilits/GlobalAssets";
import { backIcon } from "../utilits/GlobalImages";

interface myProps {
  title: any;
}

const window = Dimensions.get("window");

const HeaderComponent = (props: myProps) => {
  console.log("props---",props)
  return (
    <>
      <View style={{ flex: 1,flexDirection: 'row' }}>
        <View style={{ flex: .4, justifyContent: 'center', alignItems: 'flex-start' }}>
          <Image source={backIcon} style={{ height: 24, width: 24, marginLeft: 20 }} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start',backgroundColor:'white' }}>

          <Text style={styles.titleInput}>{props.title}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({

  titleInput: {
    color: COLORS.black,
    letterSpacing: 1,
    fontSize: scaledSize(18),
    fontFamily: Fonts.PTSerifBold
  }
});

export default HeaderComponent;
