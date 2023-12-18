// import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { Alert, Modal, Platform } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Dimensions, PermissionsAndroid } from 'react-native';
import Map, { Logger } from '@rnmapbox/maps';
import UserLocation from '@rnmapbox/maps';
import Ionicons from 'react-native-vector-icons/FontAwesome5'
import ColorfulCard from '@freakycoder/react-native-colorful-card';
import Geolocation from '@react-native-community/geolocation';
import Popover from "react-native-popover-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SliderBox } from "react-native-image-slider-box";
import { deviceWidth, getUUIDV4, scaledSize } from '../../helper/util/Utilities';





Map.setWellKnownTileServer('Mapbox')
Map.setAccessToken("pk.eyJ1Ijoic2hvcGF4IiwiYSI6ImNsN3Zlc3IyYjAyYXEzd3BiamljNTlsNzEifQ.UKKhtejhtvJTtfzwQHa1XA");
// MapboxGL.setConnected(true)
Map.setTelemetryEnabled(false);

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'auto',
});

// edit logging messages
Logger.setLogCallback(log => {
  const { message } = log;

  // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});

const routeProfiles = [
  { id: 'walking', label: 'Walking', icon: 'walking' },
  { id: 'cycling', label: 'Cylcing', icon: 'bicycle' },
  { id: 'driving', label: 'Driving', icon: 'car' },
];
// const [coords, setCoords] = useState<[number, number]>([75.88660222144553, 22.692505680540137]);

const CustomMap: React.FC = () => {
  const [routeDirections, setRouteDirections] = useState<any | null>(null);
  const [coords, setCoords] = useState<[number, number]>([75.88600432946546, 22.696400141312875]);
  // const [coords, setCoords] = useState<[number, number]>([75.8868134, 22.6925421]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState<Boolean>(false)
  const [reload, setReload] = useState<Boolean>(false)
  const [isVisible, setIsVisible] = useState(false)
  const [imgUrls, setImgUrls] = useState([{}])
  const [price, setPrice] = useState('')
  const [heading, setHeading ] = useState('')
  const [description , setDescription] = useState('')

  const APIKEY = "pk.eyJ1Ijoic2hvcGF4IiwiYSI6ImNsN3Zlc3IyYjAyYXEzd3BiamljNTlsNzEifQ.UKKhtejhtvJTtfzwQHa1XA";
  const [destinationCoords, setDestinationCoords] = useState<[number, number]>([
    75.89405463418585, 22.747417880919198,]);
  const [loading, setLoading] = useState(true);
  const [selectedRouteProfile, setselectedRouteProfile] =
    useState<string>('walking');
  const mapRef = useRef(null);
  // const route = useRoute<any>();
  // const navigation = useNavigation<any>();

  // const {store} = route.params;

  const insets = useSafeAreaInsets();

  async function getPermissionLocation() {

    const res = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
    console.log('permission check--', res);



  }

  const data = [{
    name: 'first', coords: { longitude: 75.8867677, latitude: 22.6925421 }, type: "office", price: '2709', images: [{ uri: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg' },
    { uri: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg' }],
    heading: 'available shop on plasia', description: 'There are multiple matches for plasia, including a word-forming element in biology and medicine and a suburb of Indore.'
  },
  { name: 'Second', coords: { longitude: 75.88302286574294, latitude: 22.711779694040896 }, type: 'home' },
  { name: 'third', coords: { longitude: 75.8846963870179, latitude: 22.72464600641459 }, type: 'shop' }]

  useEffect(() => {


    getPermissionLocation()

  }, [permissionGranted, reload])

  const [showPopover, setShowPopover] = useState(false);

  // useEffect(() => {
  //   //console.log(store.longitude);
  //   // setPermissionGranted(true)
  //   if (permissionGranted) {


  //     if (selectedRouteProfile !== null) {
  //       createRouterLine(coords, selectedRouteProfile);
  //       console.log("in useEffect--coordinates--", coords);
  //     } else {
  //       console.log("Error in useEffect ", permissionGranted)
  //     }

  //   }
  // }, [permissionGranted, coords]);

  //   function makeRouterFeature(coordinates: [number, number][]): any {
  //     let routerFeature = {
  //       type: 'FeatureCollection',
  //       features: [
  //         {
  //           type: 'Feature',
  //           properties: {},
  //           geometry: {
  //             type: 'LineString',
  //             coordinates: coordinates,
  //           },
  //         },
  //       ],
  //     };
  //     return routerFeature;
  //   }

  //   async function createRouterLine(
  //     coords: [number, number],
  //     routeProfile: string,
  //   ): Promise<void> {
  //     if(coords.length>1){
  //     const startCoords = `${coords[0]},${coords[1]}`;
  //     const endCoords = `${destinationCoords[0]},${destinationCoords[1]}`;
  //     const geometries = 'geojson';
  //     const url = "https://api.mapbox.com/directions/v5/mapbox/driving/" + startCoords + ";" + endCoords + "?alternatives=true&geometries=" + geometries + "&steps=true&banner_instructions=true&overview=full&voice_instructions=true&access_token=" + APIKEY;


  //     try {
  //       let response = await fetch(url);
  //       let json = await response.json();

  //       const data = json.routes.map((data: any) => {
  //         console.log(data);
  //         setDistance((data.distance / 1000).toFixed(2));
  //         setDuration((data.duration / 3600).toFixed(2));
  //       });

  //       let coordinates = json['routes'][0]['geometry']['coordinates'];
  //       let destinationCoordinates =
  //         json['routes'][0]['geometry']['coordinates'].slice(-1)[0];
  //       setDestinationCoords(destinationCoordinates);
  //       if (coordinates.length) {
  //         // console.log("route coordinates---", coordinates)
  //         const routerFeature = makeRouterFeature([...coordinates]);
  //         setRouteDirections(routerFeature);
  //       }
  //       setLoading(false);
  //     } catch (e) {
  //       setLoading(false);
  //       console.log(e);
  //     }
  //     }
  //   }
  const handlePopOver = (item: any) => {
    console.log("popver open");
    setPrice(item.price)
    setHeading(item.heading)
    setDescription(item.description)
    const imgUrls = item.images.filter((data: any) => data.uri !== "Emptyimage")
      .map((data: any) => data.uri);
    console.log("imgUrls", imgUrls);
    setImgUrls(imgUrls)
    setIsVisible(!isVisible)
    setShowPopover(true)
  }
  const handleClosePopOver = () => {
    console.log("popOver close");

    setShowPopover(false)
  }
  // const imgData = [
  //   {uri:'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg'},
  //   {uri:'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg'}
  // ]





  return (
    <View style={styles.container}>
      {/* <MapboxGL.MapView
            ref={mapRef} // Assign the mapRef to the MapView

        style={styles.map}
        zoomEnabled={true}
        styleURL="mapbox://styles/mapbox/navigation-night-v1"
        rotateEnabled={true}
        onDidFinishLoadingMap={async () => {
                await createRouterLine(coords, selectedRouteProfile);
        }}>
        <MapboxGL.Camera
          zoomLevel={12}
          centerCoordinate={coords}
          animationMode={'flyTo'}
          animationDuration={6000}
        />
        {routeDirections && (
          <MapboxGL.ShapeSource id="line1" shape={routeDirections}>
            <MapboxGL.LineLayer
              id="routerLine01"
              style={{
                lineColor: '#FA9E14',
                lineWidth: 4,
              }}
            />
          </MapboxGL.ShapeSource>
        )}
        {destinationCoords && (
          <MapboxGL.PointAnnotation
            id="destinationPoint"
            coordinate={destinationCoords}>
            <View style={styles.destinationIcon}>
              <Ionicons name="storefront" size={24} color="#E1710A" />
            </View>
          </MapboxGL.PointAnnotation>
        )}
        <MapboxGL.UserLocation
        visible={true}
        onUpdate={(location) => {
          const { latitude, longitude } = location;
          // Update the map with the new location
          if (mapRef.current) {
            mapRef.current.setCamera({
              centerCoordinate: [longitude, latitude],
              zoom: 15,
            });
          }
        }}
      />
      </MapboxGL.MapView> */}
      <Map.MapView
        ref={mapRef} // Assign the mapRef to the MapView
        styleURL='mapbox://styles/mapbox/streets-v12'
        style={styles.map}
        zoomEnabled={true}
        // styleURL="mapbox://styles/shopax/clmsvy6qp02ds01pj1tlke9je"
        rotateEnabled={true}
      >
        <Map.Camera
          zoomLevel={14}
          centerCoordinate={[75.88600432946546, 22.696400141312875]}
          animationMode={'flyTo'}
          animationDuration={6000}
        />

        {/* <Map.PointAnnotation
          id="destinationPoint"
          coordinate={[75.88460359884049, 22.724585546072984]}
          onSelected={() => handlePopOver()}>
          <TouchableOpacity style={styles.destinationIcon}>
            <Ionicons name="storefront" size={24} color="#E1710A" />

          </TouchableOpacity>
        </Map.PointAnnotation> */}

        {data.map((item: any, index: any) => {
          return <Map.PointAnnotation
            id={`${index}`}
            key={index}
            coordinate={[item.coords.longitude, item.coords.latitude]}
            onSelected={() => handlePopOver(item)}>
            <TouchableOpacity style={styles.destinationIcon}>
              <Icon name={item.type === "home" ? "home-outline" : (item.type === "shop" ? "shopping-outline" : "office-building")
              } size={24} color="#E1710A" />

            </TouchableOpacity>
           
          </Map.PointAnnotation>
        })}
      </Map.MapView>

      <Modal
              visible={isVisible}
              transparent
              animationType='fade'
              
              >
              <View style={styles.modalContainer}>
                <View style={styles.flatlistContainer}>
                  <View>
                    <Text style={{color:'black'}}>{heading}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setIsVisible(false)} style={{}}>
                    <View>
                      <Icon name='close' size={24} color="#fff" />
                    </View>
                  </TouchableOpacity>
                  <SliderBox
                    images={imgUrls}
                    testID="imageSlider"
                    // autoplay
                    
                    dotColor="#FFF"
                    inactiveDotColor="#90A4AE"
                    // autoplayInterval={3000}
                    // circleLoop
                    ImageComponentStyle={styles.imageStyle}
                  />
                  <View>
                    <Text style={{color:'black'}}>Price----{price}</Text>
                  </View>
                  <View>
                    <Text style={{color:'black'}}>Description : {description}</Text>
                  </View>

                </View>
              </View>

            </Modal>

    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0 ,0 , 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 2,
  },
  cardContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  destinationIcon: {
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeProfileList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  flatlistContainer: {
    top:100,
    height: scaledSize(220),
    justifyContent: "center",
    // backgroundColor:'red',
    alignItems: "center",
    borderRadius: 12,
    width: deviceWidth - 64,
  },
  flatList: {
    position: 'absolute',
    bottom: 20,
    left: Dimensions.get('window').width / 2 - 40,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  imageStyle: {
    width: deviceWidth - 64,
    height: scaledSize(220),
    resizeMode: "cover",
    borderRadius: 12,
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  routeProfileButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 8,
    borderColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  selectedRouteProfileButton: {
    backgroundColor: '#FA9E14',
    borderColor: '#FA9E14',
  },
  routeProfileButtonText: {
    color: '#fff',
    marginTop: 5,
  },
  selectedRouteProfileButtonText: {
    color: 'white',
  },
  modalContainer:{
    flex: 1,
    justifyContent:'flex-start',
    padding:scaledSize(20),
    //backgroundColor: 'transparent',
    // alignItems: 'center',
    // justifyContent: 'center',
   backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
});

export default CustomMap;
