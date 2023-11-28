import { View, Text, TouchableOpacity,Image,FlatList } from 'react-native'
import React,{useState} from 'react'
import { launchImageLibrary,launchCamera ,ImagePickerResponse,ImageLibraryOptions,CameraOptions} from 'react-native-image-picker';
import { TextInput,StyleSheet,ScrollView } from 'react-native'
import { scaledSize } from '../../helper/util/Utilities'
import { Fonts } from '../../utilits/GlobalAssets';
import DropDownPicker from 'react-native-dropdown-picker'
import Icon from 'react-native-vector-icons/AntDesign';

const UserRequirements = () => {
  
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const [bedOpen, setBedOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Camera', value: 'camera'},
        {label: 'Gallery', value: 'gallery'},
    ]);
    const [bedroom, setBedRoom] = useState(null)
    const [bedroomitems, setBedRoomItems] = useState([
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '10', value: '10'},
    ])
    const [bathOpen, setBathOpen] = useState(false)
    const [bathroom, setBathRoom] = useState("")
    
    const [bathroomitems, setBathRoomItems] = useState([
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '10', value: '10'},
    ])
    const [floorOpen, setFloorOpen] = useState(false)
    const [floor, setFloor] = useState("")
    const [flooritems, setFloorItems] = useState([
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '10', value: '10'},
    ])
    const [age, setAge] = useState("")
    const [ageOpen, setAgeOpen] = useState(false)
    const [ageitems, setAgeItems] = useState([
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '10', value: '10'},
    ])
    const [availableFrom, setAvailableFrom] = useState("")
    const [plotWidth, setPlotWidth] = useState("")
    const [plotLength, setPlotLength] = useState("")
    const [size, setSize] = useState("")
    const [monthlyRent, setMonthlyRent] = useState("")
    const [securityAmount, setSecurityAmount] = useState("")
    const [maintenanceCharge, setMaintenanceCharge] = useState("")
    const [city, setCity] = useState("")
    const [cityOpen, setCityOpen] = useState(false)
    const [cityitems, setCityItems] = useState([
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '10', value: '10'},
    ])
    const [address, setAddress] = useState("")
    const [maintenanceFrequency, setMaintenanceFrequency] = useState("")
    const [maintenanceFOpen, setMaintenanceFOpen] = useState(false)
    const [maintenanceFitems, setMaintenanceFItems] = useState([
        {label: 'Monthly', value: 'Monthly'},
        {label: 'Quaterly', value: 'Quaterly'},
        {label: 'Half-Yearly', value: 'Half-Yearly'},
        {label: 'Yearly', value: 'Yearly'},
        
    ])
    const [furnishedType, setFurnishedType] = useState("")
    const [furnishedOpen, setFurnishedOpen] = useState(false)
    const [furnisheditems, setFurnishedItems] = useState([
        {label: 'non-furnished', value: 'non-furnished'},
        {label: 'semi-furnished', value: 'semi-furnished'},
        {label: 'Fully-furnished', value: 'Fully-furnished'},
    ])
    const [accountStatus, setAccountStatus] = useState("")
    const [propertyType, setPropertyType] = useState("")
    const [propertyOpen, setPropertyOpen] = useState(false)
    const [propertyitems, setPropertyItems] = useState([
        {label: 'rent', value: 'rent'},
        {label: 'PG', value: 'pg'},
        {label: 'Purchase', value: 'Purchase'},
    ])

    const openImagePicker = () => {
        const options: ImageLibraryOptions = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        };
    
        launchImageLibrary(options, (response: ImagePickerResponse) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorMessage) {
            console.log('Image picker error: ', response.errorMessage);
          } else {
            let imageUri = response.assets?.[0] && response.assets[0].uri;
            setSelectedImages((prevImages) => [...prevImages, imageUri || '']);
          }
        });
      };
    
      const handleCameraLaunch = () => {
        const options: CameraOptions = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        };
    
        launchCamera(options, (response: ImagePickerResponse) => {
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.errorMessage) {
            console.log('Camera Error: ', response.errorMessage);
          } else {
            let imageUri = response.assets?.[0] && response.assets[0].uri;
            setSelectedImages((prevImages) => [...prevImages, imageUri || '']);
            console.log(imageUri);
          }
        });
      };
    
      const deleteImage = (index: number) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);
      };

      const renderImageItem = ({ item, index }: { item: string; index: number }) => (
        <View style={{ position: 'relative' }}>
          <Image source={{ uri: item }} style={styles.image} />
          <TouchableOpacity style={styles.deleteIconContainer} onPress={() => deleteImage(index)}>
            <Icon name="delete" />
          </TouchableOpacity>
        </View>
      );
    
  
  
    return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
        <ScrollView style={styles.scrollView}>
      <View>
      <Text style={styles.text} aria-label="Label for Username" nativeID="labelBedroom">Number of BedRooms</Text>
        {/* <TextInput style={styles.input} onChangeText={(text)=>{setBedRoom(text),console.log("value of bedroom",bedroom)}} inputMode='numeric'/> */}
        <DropDownPicker 
      open={bedOpen}
      value={bedroom}
      items={bedroomitems}
      setOpen={setBedOpen}
      setValue={setBedRoom}
      setItems={setBedRoomItems}
      placeholder={'Select Number of Bedrooms.'}
      autoScroll={true}
      style={styles.dropdown}
      dropDownContainerStyle={styles.dropDownContainer}
      labelStyle={styles.label}
      zIndex={6000}
      />
     <Text style={styles.text} aria-label="Label for Username" nativeID="labelBathroom">Number of BathRooms</Text>
        {/* <TextInput style={styles.input} onChangeText={(text)=>setBathRoom(text)} inputMode='numeric' aria-label="input" aria-labelledby="labelBathroom" /> */}
        <DropDownPicker 
      open={bathOpen}
      value={bathroom}
      items={bathroomitems}
      setOpen={setBathOpen}
      setValue={setBathRoom}
      setItems={setBathRoomItems}
      placeholder={'Select Number of Bathrooms.'}
      autoScroll={true}
      style={styles.dropdown}
      dropDownContainerStyle={styles.dropDownContainer}
      labelStyle={styles.label}
      zIndex={5000}
    />
     <Text style={styles.text} aria-label="Label for Username"  nativeID="labelFloor">Number of Floors</Text>
        {/* <TextInput style={styles.input} onChangeText={(text)=>setFloor(text)} inputMode='numeric' aria-label="input" aria-labelledby="labelFloor" /> */}
        <DropDownPicker 
      open={floorOpen}
      value={floor}
      items={flooritems}
      setOpen={setFloorOpen}
      setValue={setFloor}
      setItems={setFloorItems}
      placeholder={'Select Number of Floors.'}
      style={styles.dropdown}
      dropDownContainerStyle={styles.dropDownContainer}
      labelStyle={styles.label}
      zIndex={4000}
      />
    <Text style={styles.text} aria-label="Label for Username" nativeID="labelConstructionAge">Construction Age</Text>
    <DropDownPicker 
      open={ageOpen}
      value={age}
      items={ageitems}
      setOpen={setAgeOpen}
      setValue={setAge}
      setItems={setAgeItems}
      placeholder={'Select Age.'}
      style={styles.dropdown}
      dropDownContainerStyle={styles.dropDownContainer}
      labelStyle={styles.label}
      zIndex={3000}
      />
        <Text style={styles.text} aria-label="Label for Username" nativeID="labelPlotWidth">Plot Width</Text>
           <TextInput style={styles.input} onChangeText={(text)=>setPlotWidth(text)} inputMode='decimal' aria-label="input" aria-labelledby="labelPlotWidth" />
        <Text style={styles.text} aria-label="Label for Username" nativeID="labelPlotLength">Plot Length</Text>
           <TextInput style={styles.input} onChangeText={(text)=>setPlotLength(text)} inputMode='decimal' aria-label="input" aria-labelledby="labelPlotLength" />
        <Text style={styles.text} aria-label="Label for Username" nativeID="labelTotalSize">Total Size in Square Feet</Text>
           <TextInput style={styles.input} onChangeText={(text)=>setSize(text)} inputMode='decimal' aria-label="input" aria-labelledby="labelTotalSize" />
        <Text style={styles.text} aria-label="Label for Username" nativeID="labelRent">Monthly Rent</Text>
           <TextInput style={styles.input} onChangeText={(text)=>setMonthlyRent(text)} inputMode='decimal' aria-label="input" aria-labelledby="labelRent" />
        <Text style={styles.text} aria-label="Label for Username" nativeID="labelSecurityAmount">Security Amount</Text>
           <TextInput style={styles.input} onChangeText={(text)=>setSecurityAmount(text)} inputMode='decimal' aria-label="input" aria-labelledby="labelSecurityAmount" />
        <Text style={styles.text} aria-label="Label for Username" nativeID="labelMaintenanceChrg">Maintenance Charge</Text>
           <TextInput style={styles.input} onChangeText={(text)=>setMaintenanceCharge(text)} inputMode='decimal' aria-label="input" aria-labelledby="labelMaintenanceChrg" />
        {/* <TextInput style={styles.input} onChangeText={(text)=>setAge(text)} inputMode='numeric' aria-label="input" aria-labelledby="labelConstructionAge" /> */}
        <Text style={styles.text} aria-label="Label for Username" nativeID="labelCity">City</Text>
           {/* <TextInput style={styles.input}  textAlignVertical="top" onChangeText={(text)=>setCity(text)} inputMode='text' aria-label="input" aria-labelledby="labelCity" /> */}
           <DropDownPicker 
      open={cityOpen}
      value={city}
      items={cityitems}
      setOpen={setCityOpen}
      setValue={setCity}
      setItems={setCityItems}
      placeholder={'Select City.'}
      style={styles.dropdown}
      dropDownContainerStyle={styles.dropDownContainer}
      labelStyle={styles.label}
      zIndex={6000}
      />
        <Text style={styles.text} aria-label="Label for Username" nativeID="labelAddress">Address</Text>
           <TextInput style={[styles.input,{height:scaledSize(60)}]} numberOfLines={2} onChangeText={(text)=>setAddress(text)} inputMode='text' aria-label="input" aria-labelledby="labelAddress" />
           <Text style={styles.text} aria-label="Label for Username" nativeID="labelmaintenanceFrq">Maintenance Frequency</Text>
           <DropDownPicker 
      open={maintenanceFOpen}
      value={maintenanceFrequency}
      items={maintenanceFitems}
      setOpen={setMaintenanceFOpen}
      setValue={setMaintenanceFrequency}
      setItems={setMaintenanceFItems}
      placeholder={'Select Maintenanace Frequency.'}
      style={styles.dropdown}
      dropDownContainerStyle={styles.dropDownContainer}
      labelStyle={styles.label}
      zIndex={5000}
      />
           <Text style={styles.text} aria-label="Label for Username" nativeID="labelFurnishedType">Furnished Type</Text>
           <DropDownPicker 
      open={furnishedOpen}
      value={furnishedType}
      items={furnisheditems}
      setOpen={setFurnishedOpen}
      setValue={setFurnishedType}
      setItems={setFurnishedItems}
      placeholder={'Select Furnished Type.'}
      style={styles.dropdown}
      dropDownContainerStyle={styles.dropDownContainer}
      labelStyle={styles.label}
      zIndex={4000}
      />
              {/* <TextInput style={styles.input} onChangeText={(text)=>setFurnishedType(text)} inputMode='text' aria-label="input" aria-labelledby="labelFurnishedType" /> */}
           {/* <TextInput style={styles.input} onChangeText={(text)=>setMaintenanceFrequency(text)} inputMode='text' aria-label="input" aria-labelledby="labelmaintenanceFrq" /> */}
     {/* <Text style={styles.text} aria-label="Label for Username" nativeID="labelAvailableFrom">Available From Date</Text>
        <TextInput style={styles.input} onChangeText={(text)=>setAvailableFrom(text)} aria-label="input" aria-labelledby="labelAvailableFrom" />*/}
     

    <Text style={styles.text} aria-label="Label for Images" nativeID="labelPropertyImages">Property Images</Text> 
    <DropDownPicker 
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={'Select Image Method.'}
      zIndex={3000}
      onChangeValue={(value) => {
        value === "gallery" ? openImagePicker() : handleCameraLaunch() 
      }}
      onSelectItem={(item) => {
        item.value === "gallery" ? openImagePicker() : handleCameraLaunch() 
      }}
      style={styles.dropdown}
      dropDownContainerStyle={styles.dropDownContainer}
      labelStyle={styles.label}
      />
      {selectedImages.length >0 ? <View>
        <FlatList
        data={selectedImages}
        renderItem={renderImageItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
      />
      <TouchableOpacity onPress={()=>{value==="gallery"?openImagePicker():handleCameraLaunch()}}>
        <Text style={styles.text}>Add More Images</Text>
      </TouchableOpacity>
    </View>:null} 
     <Text style={[styles.text,{marginTop:scaledSize(15)}]} aria-label="Label for Username"  nativeID="labelPropertyTypOption">Property Type Option</Text>
     <DropDownPicker 
      open={propertyOpen}
      value={propertyType}
      items={propertyitems}
      setOpen={setPropertyOpen}
      setValue={setPropertyType}
      setItems={setPropertyItems}
      placeholder={'Select Property Type.'}
      style={[styles.dropdown,{marginBottom:scaledSize(10)}]}
      dropDownContainerStyle={styles.dropDownContainer}
      labelStyle={styles.label}
      zIndex={2000}
      />
        {/* <TextInput style={styles.input} onChangeText={(text)=>setPropertyType(text)} inputMode='text' aria-label="input" aria-labelledby="labelPropertyTypOption" /> */}
      </View>
      </ScrollView>
    </View>
  )
}

export default UserRequirements

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    label:{
        borderRadius: scaledSize(25),
        color: 'red',
        paddingLeft: scaledSize(18),
    },
    dropdown:{
         height: scaledSize(50),
          backgroundColor: 'white',
        borderWidth: 1,
         borderColor: '#E0DFE4',
        borderRadius: scaledSize(40),
    },
    scrollView: {
        marginHorizontal: 20,
      },
    text:{
        fontFamily:Fonts.regular,
        color:'black',
        fontWeight:'600',
        paddingTop:scaledSize(10)
    },
    image: {
        width: 200,
        height: 200,
      },
      container : {
        backgroundColor: 'white',
                borderWidth: 1, borderColor: '#E0DFE4',
                borderRadius: scaledSize(40),
      },
      dropDownContainer :{
        backgroundColor: "white",
        borderColor:"#E0DFE4"
      },
      deleteIconContainer: {
        position: 'absolute',
        top: 0,
        left: 170,
        padding: 10,
        // backgroundColor: 'rgba(255, 255, 255, 0.8)',
      },
  });