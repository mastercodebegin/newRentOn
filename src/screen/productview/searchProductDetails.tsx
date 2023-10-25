//@ts-nocheck
import React, { createRef, useEffect, useState, useRef } from 'react'
import {
  View, Text, FlatList, Image, ScrollView, Dimensions, Modal, TouchableOpacity,
  StatusBar, ImageBackground
} from 'react-native'
import { Modalize } from 'react-native-modalize';
import { AirbnbRating } from 'react-native-ratings';
import FlashMessage from "react-native-flash-message";
import { capitalizeFirstLetter, scaledSize } from '../../helper/util/Utilities';
import { COLORS } from '../../utilits/GlobalAssets';
import { battery, camera, flash, processor, ram, rupee, signal, } from '../../utilits/GlobalImages';
import { styles } from '../productList/productStyle';
import ImageSlider from '../../component/ImageSlider';
import { UrlConstants } from '../../context/service/UrlConstants';
import { SliderBox } from "react-native-image-slider-box";
import Icon from "react-native-vector-icons/FontAwesome";
import { LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../productList/ProductsSlice';
import GradientButton from '../../component/GradientButton';
import { Button } from 'react-native-paper';










const data = [UrlConstants.S3_BASE_URL + '3901416d8927dcb004d.jpeg', UrlConstants.S3_BASE_URL + '123.jpeg', UrlConstants.S3_BASE_URL + '1.jpeg']
export default searchProductDetails = (props) => {

  const [isZoomIn, setIsZoomIn] = useState(flash)
  const [variant, setVariant] = useState()
  const [variantSpecification, setVariantSpecification] = useState()
  const [variantID, setVariantID] = useState([])
  const [variantImages, setVariantImages] = useState([])
  const [heightn, s] = useState(20)
  const [varaiantColorID, setVariantColorID] = useState(1)
  const [vendorID, setVendorID] = useState(1)
  const [customWidth, setCustomWidth] = useState(0)
  const [modalNumber, setModalNumber] = useState('')
  const [price, setPrice] = useState('')
  const [colorName, setColorName] = useState('')
  const [vendorProductsVariantColorID, setVendorProductsVariantColorID] = useState()

  const dispatch = useDispatch()
  useEffect(() => {
    console.log('props---', props.route.params.data);
    // dispatch(getProductById(props.route.params.data))
    getVariants(0)
  }, [])
  useEffect(() => {
    // console.log('variants---', variant);
    // console.log('varaiantColorID---', varaiantColorID);
    console.log('variantSpecification---', variantSpecification);

  }, [variant, varaiantColorID, variantID, variantSpecification])

  const getVariants = (variantIndex,) => {

    const str = JSON.stringify(props.route.params.data)
    const obj = JSON.parse(str)
    setVariantImages(obj.vendorProductsVaraint[0].vendorProductsVariantColor[0].modalColors.modalImages.map((item) => item).map((image) => UrlConstants.S3_BASE_URL + image.imageName))
    setVariant(obj)
    setVariantID(obj.vendorProductsVaraint[0].id)
    setVariantColorID(obj.vendorProductsVaraint[0].vendorProductsVariantColor[0].modalColors.id)
    setVendorProductsVariantColorID(obj.vendorProductsVaraint[0].vendorProductsVariantColor[0]?.id)
    setModalNumber(obj.productModelNumber?.name)
    setVariantSpecification(obj.vendorProductsVaraint[0])
    setPrice(obj.vendorProductsVaraint[0].price)
    setColorName(obj.vendorProductsVaraint[0].vendorProductsVariantColor[0].modalColors?.colorName?.color)
    setVendorID(obj?.vendor?.id)
    console.log('price---', obj.vendorProductsVaraint[0].price);
    console.log('price---', obj.productModelNumber?.name);



  }

  const onSelectVariant = (tempVariant, variantIndex) => {
    console.log('tempVariantID---', variant);
    console.log('specification', variantSpecification);

    const images = tempVariant?.vendorProductsVariantColor[0]?.modalColors.modalImages.map((item) => item.imageName).map((item) => UrlConstants.S3_BASE_URL + item)
    console.log('images---', images);
    setVariantColorID(tempVariant.vendorProductsVariantColor[0].modalColors)
    setVariantID(tempVariant.id)
    setVariantImages(images)
    console.log(tempVariant[variantIndex]);
    setVariantSpecification(tempVariant)
    // setVariantSpecification(variant)

  }
  const setVariantColorHandler = (modalColors, index, variant, variantIndex, varaiantColor) => {
    console.log('modalColorsID-----', modalColors);
    setVariantImages(modalColors.modalImages.map((item) => item.imageName).map((item) => UrlConstants.S3_BASE_URL + item))
    setVariantColorID(modalColors.id)
    setVariantID(variant.id)
    setVariantSpecification(variant)
    setVendorProductsVariantColorID(varaiantColor.id)
    setColorName(modalColors?.colorName?.color)
  }

  const renderSpecification = (icon, label, value) => {
    return (<View style={{
      flexDirection: 'row',
      alignItems: 'center',

    }}>
      <View style={{ height: 40, width: 80, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={icon} style={{ height: 26, width: 26, }} resizeMode='contain' />
      </View>
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.specificationLabel}>{label}</Text>
        <Text style={styles.specificationValue}>
          {value}
        </Text>
      </View>
    </View>)
  }
  const onLayout = e => {
    // this.setState({
    //   width: e.nativeEvent.layout.width
    // });
    setCustomWidth(e.nativeEvent.layout.width)
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.white, }}>
      <FlashMessage animationDuration={450} position={'top'} />
      <StatusBar backgroundColor={'#349699'} />
      <View style={{ height: 60, }}>
        <TouchableOpacity style={{
          margin: 20
        }} onPress={() => props?.navigation?.goBack()}>
          <Icon name="arrow-left" color="black" size={20} />
        </TouchableOpacity>
      </View>



      {/* **************************** Product Images start ******************************************* */}

      <View onLayout={onLayout}>

        <SliderBox images={variantImages}
          sliderBoxHeight={400}
          parentWidth={customWidth}
          //  ImageComponentStyle={{borderRadius: 15, width: '90%', marginTop: 5}}

          resizeMode={'center'}
          activeOpacity={0.5}
          dotColor="black"
          inactiveDotColor="#90A4AE"
        />

      </View>
      {/* **************************** Product Images End ******************************************* */}

      {/* **************************** Variant View Start ******************************************* */}
      <View style={{ flexDirection: 'column', marginLeft: 8, marginTop: 20, }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: 'black' }}>
          Select Variant
        </Text>
        {<FlatList
          data={variant?.vendorProductsVaraint}
          numColumns={2}
          renderItem={({ item, variantIndex }) => <View style={{
            flexDirection: 'row', flex: 1, marginTop: 14,
            margin: 4, borderWidth: 1,
            borderColor: item.id == variantID ? COLORS.activeBorderColor : COLORS.borderColor,
          }}>
            <TouchableOpacity onPress={() => onSelectVariant(item, variantIndex)} style={{ flex: 1 }}>
              <View style={{
                alignItems: 'center', flexDirection: 'row',
                justifyContent: 'center', backgroundColor: '#f6f6f6',
              }}>
                <Text style={{ color: 'black', fontSize: 14, fontWeight: '600', padding: 8 }}>
                  {`${item?.variant?.ram}GB/${item?.variant?.rom}GB`}</Text>
              </View>
              <View style={{
                flexDirection: 'row', alignItems: 'center',
                justifyContent: 'center', marginTop: 4,
              }}>
                {item.vendorProductsVariantColor.map((v, index) => <TouchableOpacity
                  onPress={() => setVariantColorHandler(v?.modalColors, index, item, variantIndex, v)}
                  style={{ justifyContent: 'center', alignItems: 'center' }} key={index}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <ImageBackground style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}
                      source={{ uri: UrlConstants.S3_BASE_URL + v?.modalColors?.modalImages[0]?.imageName }}
                      resizeMode='contain' >
                      {v.modalColors.id == varaiantColorID ? <View style={{
                        height: 40, width: 30,
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        opacity: 0.5,
                        marginLeft: 6,
                        borderRadius: 4,
                        backgroundColor: 'black',
                        alignSelf: 'center'
                      }}
                        source={flash}
                        resizeMode='contain'>
                        <Image style={{
                          height: 40, width: 40, tintColor: 'white',
                          justifyContent: 'center', alignItems: 'center'
                        }}
                          source={flash}
                          resizeMode='contain' ></Image>
                      </View> : null}
                    </ImageBackground>
                    <Text style={{ color: 'black', fontSize: 12 }}>{v?.modalColors?.colorName?.color}</Text>
                  </View>
                </TouchableOpacity>
                )}
              </View>

            </TouchableOpacity>
          </View>}
        />
        }
      </View>
      {/* **************************** Variant View End ******************************************* */}

      {/* **************************** Variant  Specification Details View Start ******************************************* */}
      <View style={{ backgroundColor: 'white', marginLeft: 20 }}>
        <Text style={{ fontSize: 12, fontWeight: '600', marginTop: 10, color: COLORS.black }}>{variant?.brand?.name}</Text>
        <Text style={{ fontSize: 12, fontWeight: '600', marginTop: 4, color: COLORS.black }}>{`${variant?.productModelNumber?.name} (${capitalizeFirstLetter(variant?.vendorProductsVaraint[0]?.vendorProductsVariantColor[0].modalColors?.colorName?.color)})`}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Image source={rupee} style={{ height: 16, width: 16, }} resizeMode='contain' />
          <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.black }}>{variantSpecification?.price}</Text>
        </View>

      </View>
      {/* **************************** Variant  Specification Details View End ******************************************* */}


      {/* **************************** Rating start ******************************************* */}

      <View style={{ marginTop: scaledSize(24), flexDirection: 'row', alignItems: 'center', marginLeft: scaledSize(30) }}>
        <AirbnbRating
          count={5}
          showRating={false}
          defaultRating={3}
          size={13}
          onFinishRating={(value) => this.setState({ rating: value })}
        />
        <Text style={{ fontSize: scaledSize(12), fontFamily: 'ZenKakuGothicAntique-Medium', color: 'gray' }}>3</Text>
      </View>
      {/* **************************** Rating End ******************************************* */}

      {/* **************************** Variant  Start ******************************************* */}
      <View style={{
        marginTop: scaledSize(24),
        marginLeft: 20
      }}>

        <View style={styles.commonView}>

          {renderSpecification(ram, 'RAM | ROM', `${variantSpecification?.variant?.rom}GB | ${variantSpecification?.variant.ram}GB`)}

        </View>

        <View style={styles.commonView}>
          {renderSpecification(processor, 'Processor', capitalizeFirstLetter(`${variantSpecification?.variant.processor}`))}
        </View>

        <View style={styles.commonView}>
          {renderSpecification(camera, 'Front Camera', `${variantSpecification?.variant.mainCamera}`)}
        </View>

        <View style={styles.commonView}>
          {renderSpecification(camera, 'Back Camera', `${variantSpecification?.variant.selfieCamera}`)}
        </View>
        <View style={styles.commonView}>
          {renderSpecification(battery, 'Battery', `${variantSpecification?.variant.battery}`)}
        </View>

        <View style={styles.commonView}>
          {renderSpecification(signal, 'Network', `${variantSpecification?.variant.network}`)}
        </View>



      </View>


      {/* **************************** Variant End ******************************************* */}


      {/* **************************** Add to Cart And Buy Now Button View  start ******************************************* */}
      <View style={{
        flexDirection: 'row', alignContent: 'center',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf:'center',
       padding:20,
       paddingLeft:0,
       paddingRight:0
      }}>
        <GradientButton
         title='Add to Cart'
         width={150}
          />
        
          <GradientButton onPress={() => {
            props.navigation.navigate('PreviewOrderDetails', {
              data:
              {
                variantSpecification: variantSpecification,
                modalNumber: modalNumber,
                price: price,
                colorName: colorName,
                colorID: vendorProductsVariantColorID,
                vendorID: vendorID


              }
            })
          }}

            width={150}
            title=' Buy Now'
          >
          </GradientButton>
        </View>
      {/* **************************** Add to Cart And Buy Now Button View  End ******************************************* */}



      {/* **************************** Modal Start******************************************* */}
      <Modal
        visible={isZoomIn}
        transparent={false}
        animationType={'none'}
      //presentationStyle={"overFullScreen"}
      >

        <View style={{
          //width: scaledSize(300),
          backgroundColor: COLORS.black,
          borderRadius: scaledSize(0),
          //opacity: 2.9,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',

        }}>
          <TouchableOpacity
            onPress={() => setIsZoomIn(false)}
            activeOpacity={0.9}
            style={[styles.buttonDelete, { zIndex: 1 }]}
          >
            <Text style={styles.titleDelete}>X</Text>
          </TouchableOpacity>

          <ImageSlider data={data} onImagePress={() => console.log()} autoPlay={false} />
        </View>

      </Modal>
      {/* **************************** Modal End******************************************* */}


    </ScrollView>
  )

}
