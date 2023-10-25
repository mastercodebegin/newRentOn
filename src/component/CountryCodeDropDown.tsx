import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform, Dimensions, Image } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown-v2';
import Icon from "react-native-vector-icons/Feather";
import { scaledSize } from '../helper/util/Utilities';
import { COLORS } from '../utilits/GlobalAssets';
import { indiaFlag } from '../utilits/GlobalImages';
const windowWidth = Dimensions.get('window').width;
interface Props {
  selectedValue?: any;
  onSelect?: any;
  style?:any;
  renderStyle?:any;
  options?: any;
  defaultValue?: any;
  onDropdownWillShow?: any;
  onDropdownWillHide?: any;
  isError?: boolean;
  onImage?:any;
  errorMessage?: string;
  isFromUpskilling?: boolean;
  isFromHigherEducation?: boolean;
  isFromAddEmployment?: boolean;
}
interface S {
  isOpendropdown: boolean
  selectedOption:any
}
export class CustomModalDropdown extends Component<Props, S> {
  state = {
    isOpendropdown: false,
    selectedOption:"",
  };
  renderButtonText = (rowData: any) => {

    const { attributes, value } = rowData;
    this.setState({selectedOption: attributes?.image})
    return `${' '}`;
  };
  renderDropDownListWithImage = (rowData: any) => {
    const { attributes, index } = rowData
    //console.log(`attribute & index`, attributes)
    return (
      <View>
      <View style={{ borderColor: '#767676', flexDirection:'row',backgroundColor:'#fff'}}>
      <Image source={rowData?.attributes?.image} resizeMode='contain' style={{width: scaledSize(20), marginTop:scaledSize(12),marginLeft:scaledSize(10),
   height: scaledSize(20), justifyContent:'center',
   }}/>
        <Text style={styles.textStyle} numberOfLines={1}> {''} {rowData?.attributes?.name}</Text>
      </View>
       <View style={{borderWidth:0.3, borderColor:'#e1e1e4'}}></View>
       </View>
    );
  }

  renderDropDownList = (rowData: any) => {
    const { attributes, index } = rowData
    //console.log(`attribute & index`, attributes)
    return (
      <View style={{ borderColor: '#767676',backgroundColor:'#fff'}}>
        <Text style={styles.textStyle1} numberOfLines={1}> {''} {rowData?.attributes?.name}</Text>
      </View>
    );
  }

  renderDropDownList1 = (rowData: any) => {
    const { attributes, index } = rowData
    //console.log(`attribute & index`, attributes)
    return (
      <View style={{ borderColor: '#767676'}}>
        <Text style={styles.textStyle} numberOfLines={1}> {''} {rowData?.attributes?.name}</Text>
      </View>
    );
  }

  renderDropDownListForDarkTheme = (rowData: any) => {
    return (
      <View style={{ borderColor: '#d3d3d3', }}>
        <Text style={styles.textStyleForDarkTheme} numberOfLines={1} >{''} {rowData.attributes.name}</Text>
      </View>
    );
  }
  renderRightComponent = () => {
    if (this.state.isOpendropdown) {
      return (
        <View style={{flexDirection:'row'}}>
           <Image source={this.state.selectedOption}  style={{ width: scaledSize(20), margin:5,top:scaledSize(-13),
       height: scaledSize(20), justifyContent:'center',position:'absolute',left:  scaledSize(-225),
       borderRadius: 34/2}} />
          <Icon name="chevron-up"
          color={'#9b9b9b'}
          size={18}
          style={{ left: scaledSize(-195), top:scaledSize(-6), position: 'absolute' }} />
          </View>
      );
    } else {
      return (
        <View style={{flexDirection:'row'}}>
      
        <Image source={this.state.selectedOption}  style={{ width: scaledSize(20), margin:5,top:scaledSize(-13),
          height: scaledSize(20), zIndex:2,position:'absolute',left:scaledSize(-225),
          borderRadius: 34/2}} />
            <Icon
          name="chevron-down"
          color={'#9b9b9b'}
          size={18}
          style={{ left: scaledSize(-195), top:scaledSize(-6), position: 'absolute' }}
        />
          </View>
      );
    }
  };

  renderComponent = () => {
    if (this.state.isOpendropdown) {
      return (
        <View style={{flexDirection:'row'}}>
        <Image source={indiaFlag}  style={{ width: scaledSize(20), margin:5,top:scaledSize(-9),
          height: scaledSize(20), position:'absolute', marginLeft:scaledSize(-220),
          borderRadius: 34/2}} />
        <Icon name="chevron-up"
          color={'#9b9b9b'}
          size={18}
          style={{  left: scaledSize(-195), top:scaledSize(-5), position: 'absolute' }} />
          </View>
      );
    } else {
      return (
        <View style={{flexDirection:'row'}}>
        <Image source={indiaFlag}  style={{ width: scaledSize(20), margin:5,top:scaledSize(-9),
          height: scaledSize(20),position:'absolute', marginLeft:scaledSize(-220),
          borderRadius: 34/2}} />
        <Icon
          name="chevron-down"
          color={'#9b9b9b'}
          size={18}
          style={{  left: scaledSize(-195), top:scaledSize(-5), position: 'absolute' }}
        />
        </View>
      );
    }
  };
 

  render() {
    // console.log(`default value****`, this.props.defaultValue)
    const { options, selectedValue, onSelect, defaultValue,
      onDropdownWillHide, onDropdownWillShow, isError, isFromUpskilling,
      errorMessage,renderStyle, onImage,style } = this.props
    return (

      <View style={{flex:1}}>
        <View style={[style ? style : styles.pickerbox,
        ]}>
          <ModalDropdown
            options={options?options:null}
            renderRow={(rowData: any) =>  onImage ? this.renderDropDownListWithImage(rowData) : this.renderDropDownList(rowData)}
            
            defaultValue={defaultValue}
            showsVerticalScrollIndicator={false}
            renderButtonText={(rowData: any) => this.renderButtonText(rowData)}
             defaultTextStyle={[styles.defaultTextStyle,]}
            renderRightComponent={this.state.selectedOption ? this.renderRightComponent : this.renderComponent}
            onDropdownWillShow={() => this.setState({ isOpendropdown: true })}
            onDropdownWillHide={() => this.setState({ isOpendropdown: false })}
            onSelect={(value:any,id:any) => onSelect(value,id)}
            
            textStyle={[styles.textStyle]}
            dropdownStyle={{
               maxHeight: scaledSize(100),
               maxWidth:scaledSize(75),
               marginTop:scaledSize(-10),
               borderRadius:scaledSize(10),
              borderColor: '#e1e1e4', borderWidth: 1.5,
              backgroundColor: '#ffffff',
             
            }} />
        </View>



      </View>

    )
  }

}

const styles = StyleSheet.create({
  defaultTextStyle: {
    flexDirection: "row",
    fontSize: Platform.OS === 'ios' ? 17.5 : scaledSize(14),
    color: COLORS.black,
    // backgroundColor: '#fff',
      //marginTop: scaledSize(8),
    marginBottom: 0,
    paddingTop: scaledSize(5),
    paddingRight:scaledSize(15),
    //fontFamily: "NunitoSans-Regular",
    marginTop:scaledSize(7),
    marginLeft:scaledSize(-8)
    // alignSelf:'auto',
    
  },
  textStyle: {
    color: COLORS.black,
    width: windowWidth * 1.3 / 2,
    // backgroundColor: '#fff',
    paddingTop: scaledSize(5),
    paddingRight:scaledSize(15),
    fontSize: Platform.OS === 'ios' ? scaledSize(18) : scaledSize(14),
    //fontFamily: "NunitoSans-Regular",
    paddingStart: Platform.OS === "web" ? 0 : scaledSize(10),
    margin:scaledSize(7),
    marginLeft:scaledSize(-8)
  },
  textStyle1: {
    color: '#707070',
    width: windowWidth * 1.3 / 2,
    // backgroundColor: '#fff',
    paddingVertical: 11,
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    //fontFamily: "NunitoSans-Regular",
    paddingStart: Platform.OS === "web" ? 0 : 10,
  },
  textStyleForAddEmployment: {
    color: '#707070',
    width: windowWidth * 1.2 / 2,
    backgroundColor: '#fff',
    paddingVertical: 11,
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    //fontFamily: "NunitoSans-Regular",
    paddingStart: Platform.OS === "web" ? 0 : 10,
    marginLeft: 10
  },
  //Style for DarkTheme
  defaultTextStyleForDarkTheme: {
    flexDirection: "row",
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    textAlign: "left",
    color: '#b5b5b5',
    marginTop: 0,
    marginLeft: 10,
    marginBottom: 0,
    paddingVertical: 11,
    paddingStart: Platform.OS === "web" ? 0 : 10,
    //fontFamily: "NunitoSans-Regular"
  },
  textStyelforDarktheme: {
    color: '#b5b5b5',
    // backgroundColor: '#505050',
    paddingVertical: 11,
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    width: windowWidth * 1.3 / 2,
    //fontFamily: "NunitoSans-Regular",
    paddingStart: Platform.OS === "web" ? 0 : 10,
    marginLeft: 10
  },

  isFromUpskillingtextStyelforDarktheme: {
    color: '#b5b5b5',
    // backgroundColor: '#464646',
    paddingVertical: 11,
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    //fontFamily: "NunitoSans-Regular",
    width: windowWidth * 1.3 / 2,
    paddingStart: Platform.OS === "web" ? 0 : 10,
    marginLeft: 10
  },
  isFromaddEmploymentforDarktheme: {
    color: '#b5b5b5',
    // backgroundColor: '#464646',
    paddingVertical: 11,
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    width: windowWidth * 1.2 / 2,
    //fontFamily: "NunitoSans-Regular",
    //width:windowWidth,
    paddingStart: Platform.OS === "web" ? 0 : 10,
    marginLeft: 10

  },
  textStyleForDarkTheme: {
    color: '#b5b5b5',
    width: windowWidth * 1.3 / 2,
    // backgroundColor: '#505050',
    paddingVertical: 11,
    fontSize: Platform.OS === 'ios' ? 18 : 16,
    marginLeft: 3,
    //fontFamily: "NunitoSans-Regular",
    paddingStart: Platform.OS === "web" ? 0 : 10
  },
  // UpskillingDarkTheme: {
  //   color: '#b5b5b5',
  //   width:220,
  //   backgroundColor: '#505050',
  //   paddingVertical: 11,
  //   fontSize: Platform.OS === 'ios' ? 18 : 16,
  //   marginLeft: 3,
  //   fontFamily: "NunitoSans-Regular",
  //   paddingStart: Platform.OS === "web" ? 0 : 10
  // },
  pickerbox: {
    zIndex: 900,
    width: '100%',
    borderRadius: 4,
    // backgroundColor: "#00000000",
    marginTop: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderColor: "#e1e1e4",
    // height: 50,
    flex:1,
    includeFontPadding: true,
    // paddingStart: Platform.OS === "web" ? 0 : 10
  },
  isFromUpskillingpickerbox: {
    zIndex: 900,
    width: '100%',
    borderRadius: 11,
    backgroundColor: "#fff",
    marginTop: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderColor: "#767676",
    height: 50,
    includeFontPadding: true,
    // paddingStart: Platform.OS === "web" ? 0 : 10
  },
  validationErr: {
    color: '#ff5858',
    fontSize: 10,
    //fontFamily: "NunitoSans-Regular",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    marginTop: 6,
    // marginBottom:4

  },
})
export default CustomModalDropdown