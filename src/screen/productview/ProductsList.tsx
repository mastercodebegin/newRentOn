import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createRef, useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TextInput, TouchableNativeFeedback, StatusBar, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { Modalize } from 'react-native-modalize';
import { Searchbar } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import HeaderComponent from '../../component/HeaderComponent';
import CustomeButton from '../../helper/util/CustomeButton';
import { scaledSize } from '../../helper/util/Utilities';
import { COLORS } from '../../utilits/GlobalColors';
import { arrowLeftIcon, black, cement, dresses, girl, green, mobile, searchIcon, suite, watch2 } from '../../utilits/GlobalImages';
const width = Dimensions.get('window').width;

interface S {
  search: any;
  //filterTabs:any;
  modalData: any;
  screenPosition: any;
  productsData: any;
  scrollLoad: boolean;
  searchProductsData: any
}
export interface Props {
  navigation: any;
  id: string;
  route: any;

}
interface SS {
  // Customizable Area Start
  id: any;
  swiper: any



  // Customizable Area End


}

const products = [
  { id: "1", price: '25.00', qty: 1, name: 'Apple Watch', image: watch2 },
  { id: "2", price: '150.00', qty: 1, name: 'black Suite', image: suite },
  { id: "3", price: '120.00', qty: 1, name: 'Blazzer Men', image: black },
  { id: "4", price: '90.00', qty: 1, name: 'Black Dress', image: dresses },
  { id: "5", price: '200.00', qty: 1, name: 'Olive Suite', image: green },
  { id: "6", price: '180.00', qty: 1, name: 'Casual Suite', image: cement },
]

const extraProducts = [
  { id: "4", price: '90.00', qty: 1, name: 'Black Dress', image: dresses },
  { id: "1", price: '25.00', qty: 1, name: 'Apple Watch', image: watch2 },
  { id: "5", price: '200.00', qty: 1, name: 'Olive Suite', image: green },
  { id: "2", price: '150.00', qty: 1, name: 'black Suite', image: suite },
  { id: "6", price: '180.00', qty: 1, name: 'Casual Suite', image: cement },
  { id: "3", price: '120.00', qty: 1, name: 'Blazzer Men', image: black },
]

export default class ProductList extends React.Component<Props, S, SS> {
  myRef: React.MutableRefObject<any>;
  swiper: React.MutableRefObject<any>;
  constructor(props: any) {
    super(props)
    this.swiper = React.createRef()
    this.state = {
      search: '',
      //filterTabs:dropdown,
      modalData: {},
      productsData: products,
      screenPosition: 0,
      scrollLoad: false,
      searchProductsData: [],
    }
    this.myRef = React.createRef();
  }


  renderItem(item: any, index: number) {
    return (<TouchableOpacity onPress={() => { this.props.navigation.navigate('ProductDetails', { data: item }) }}>
      <View style={[styles.productView, { alignItems: 'center' }]}>
        <Image resizeMethod='resize' resizeMode='contain' source={item.image} style={styles.productImage} />
        <Text style={styles.productName}>
          {item.name}</Text>
        <Text style={styles.productPrice}>
          $ {item.price}</Text>
      </View>

    </TouchableOpacity>
    )
  }

  async onEndData() {
    this.setState({ scrollLoad: true })
    setTimeout(() => {
      this.setState({ productsData: this.state.productsData.concat(extraProducts) })
      this.setState({ scrollLoad: false })
    }, 2000);

  }

  footerLoader() {
    if (!this.state.scrollLoad) return null
    return (
      <View style={{ paddingVertical: scaledSize(50) }}>
        <ActivityIndicator color='red' style={{ bottom: scaledSize(40) }} animating size={'large'} />
      </View>
    )
  }


  handleSearch = (value: any) => {
    if (this.state.productsData && value) {
      let products: any;
      products = this.state.productsData?.filter((item: any) => {
        if (item && item?.name) {
          return item?.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      })
      this.setState({ searchProductsData: products })
    }
  }

  render() {
    console.log(this.state.search)
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <TextInput placeholder='Search products . . .' style={{ width: '80%', backgroundColor: COLORS.white, left: scaledSize(50), top: scaledSize(10) }} value={this.state.search} onChangeText={(value: any) => { this.setState({ search: value }), this.handleSearch(value) }} />
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ position: 'absolute', left: 0, top: scaledSize(26), marginLeft: scaledSize(15) }}>
          <Image source={arrowLeftIcon} resizeMode='contain' style={{ width: scaledSize(20), height: scaledSize(25),tintColor:'gray',bottom:scaledSize(4) }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', right: 0, top: scaledSize(26), marginRight: scaledSize(25) }}>
          <Image source={searchIcon} resizeMode='contain' style={{ width: scaledSize(20), height: scaledSize(25) }} />
        </TouchableOpacity>
        <View style={{ marginTop: scaledSize(25), alignSelf: 'center' }}>
          <FlatList data={this.state.search ? this.state.searchProductsData : this.state.productsData}
            //indicatorStyle='black'
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            onEndReachedThreshold={0.5}
            onEndReached={() => !this.state.search && this.onEndData()}
            ListFooterComponent={() => this.footerLoader()}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleInput: {
    color: COLORS.orange,
    top: scaledSize(-10),
    marginTop: scaledSize(-10),
    // textAlign:'center',
    letterSpacing: 1,
    //fontFamily: 'Quicksand-Bold',
    //marginTop:scaledSize(10),
    fontSize: scaledSize(19),
  },
  productView: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: scaledSize(20),
    borderColor: "#dfdfdf",
    top: scaledSize(-10),
    margin: scaledSize(10),
    marginLeft: scaledSize(20),
    height: scaledSize(200),
    width: scaledSize(160)
  },
  productName: {
    fontSize: scaledSize(11), textAlign: 'center', maxWidth: scaledSize(120), justifyContent: 'center', alignItems: 'center', color: COLORS.black, marginTop: scaledSize(20), top: scaledSize(-10), marginRight: scaledSize(20), left: scaledSize(8), padding: scaledSize(1)
  },
  productPrice: {
    fontSize: scaledSize(11),
    textAlign: 'center',
    maxWidth: scaledSize(120),
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    fontFamily: 'Cormorant-Bold',
    top: scaledSize(-10),
    marginRight: scaledSize(20),
    left: scaledSize(8),
    padding: scaledSize(1)
  },
  productPrice2: {
    fontSize: scaledSize(11),
    top: scaledSize(-20),
    marginLeft: scaledSize(5),
    textAlign: 'center',
    color: COLORS.grey
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
});

