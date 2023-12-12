// import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { Alert, Platform } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Dimensions, PermissionsAndroid } from 'react-native';
import Map from '@rnmapbox/maps';
import UserLocation from '@rnmapbox/maps';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'
import ColorfulCard from '@freakycoder/react-native-colorful-card';
import Geolocation from '@react-native-community/geolocation';
import { getUUIDV4 } from '../../helper/util/Utilities';





Map.setAccessToken("pk.eyJ1Ijoic2hvcGF4IiwiYSI6ImNsN3Zlc3IyYjAyYXEzd3BiamljNTlsNzEifQ.UKKhtejhtvJTtfzwQHa1XA");
// MapboxGL.setConnected(true)
Map.setTelemetryEnabled(false);
Map.setWellKnownTileServer('Mapbox')

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'auto',
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



  async function getPermissionLocation() {

    const res = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
    console.log('permission check--', res);
   


  }

  useEffect(() => {
   

    getPermissionLocation()

  }, [permissionGranted, reload])

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

        style={styles.map}
        zoomEnabled={true}
        // styleURL=""
        rotateEnabled={true}
      >
         <Map.Camera
        zoomLevel={14}
        centerCoordinate={[75.88600432946546,22.696400141312875]}
        animationMode={'flyTo'}
        animationDuration={6000}
      />

<Map.PointAnnotation
                        id="destinationPoint"
                        coordinate={destinationCoords}>
                        <View style={styles.destinationIcon}>
                            <Ionicons name="storefront" size={24} color="#E1710A" />
                        </View>
                    </Map.PointAnnotation>


                    <Map.PointAnnotation
                        id="destinationPoint"
                        coordinate={[75.8867677,22.6925302]}>
                        <View style={styles.destinationIcon}>
                            <Ionicons name="storefront" size={24} color="#E1710A" />
                        </View>
                    </Map.PointAnnotation>

                    <Map.PointAnnotation
                        id="destinationPoint"
                        coordinate={[75.88500607075076,22.700492456617543]}>
                        <View style={styles.destinationIcon}>
                            <Ionicons name="storefront" size={24} color="#E1710A" />
                        </View>
                    </Map.PointAnnotation>

                    <Map.PointAnnotation
                        id="destinationPoint"
                        coordinate={[75.88460359884049,22.724585546072984]}>
                        <View style={styles.destinationIcon}>
                            <Ionicons name="storefront" size={24} color="#E1710A" />
                        </View>
                    </Map.PointAnnotation>
        </Map.MapView>

     

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
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeProfileList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  flatList: {
    position: 'absolute',
    bottom: 20,
    left: Dimensions.get('window').width / 2 - 40,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
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
});

export default CustomMap;
