import { View, Text, TouchableOpacity, Button, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { launchImageLibrary, launchCamera, ImagePickerResponse, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker';
import { TextInput, StyleSheet, ScrollView } from 'react-native'
import { scaledSize } from '../../helper/util/Utilities'
import { Fonts } from '../../utilits/GlobalAssets';
import DropDownPicker from 'react-native-dropdown-picker'
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomDropDown from '../../component/CustomDropDown';

const UserRequirements = () => {

    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const [bedOpen, setBedOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Camera', value: 'camera' },
        { label: 'Gallery', value: 'gallery' },
    ]);
   
    const bedroomData=[
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
    ]
    const [bedroom, setBedRoom] = useState(null)
    const [bathroom, setBathRoom] = useState("")
    const bathroomData=[
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
    ]
    
    const [floor, setFloor] = useState("")
    const floorData=[
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
    ]
    const [age, setAge] = useState("")
    const ageData=[
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
    ]
    const [city, setCity] = useState("")
    const cityData=[
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
    ]
    const [availableFrom, setAvailableFrom] = useState("")
    const [plotWidth, setPlotWidth] = useState("")
    const [plotLength, setPlotLength] = useState("")
    const [size, setSize] = useState("")
    const [monthlyRent, setMonthlyRent] = useState("")
    const [securityAmount, setSecurityAmount] = useState("")
    const [maintenanceCharge, setMaintenanceCharge] = useState("")
   
    const [address, setAddress] = useState("")
    const [maintenanceFrequency, setMaintenanceFrequency] = useState("")
    
    const maintenanceFrequencyData = [
        { label: 'Monthly', value: 'Monthly' },
        { label: 'Quaterly', value: 'Quaterly' },
        { label: 'Half-Yearly', value: 'Half-Yearly' },
        { label: 'Yearly', value: 'Yearly' },
    ]
    const [furnishedType, setFurnishedType] = useState("")
    const furnishedData = [
        { label: 'non-furnished', value: 'non-furnished' },
        { label: 'semi-furnished', value: 'semi-furnished' },
        { label: 'Fully-furnished', value: 'Fully-furnished' },
    ]
    const [accountStatus, setAccountStatus] = useState("")
    const [propertyType, setPropertyType] = useState("")
    const propertyData= [
        { label: 'rent', value: 'rent' },
        { label: 'PG', value: 'pg' },
        { label: 'Purchase', value: 'Purchase' },
    ]

    const [date, setDate] = useState('');
    const [currentDate, setCurrentDate] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


    useEffect(() => {
        console.log(`Available Date ${date}`)
    }, [date])

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        let tempDate = date.toString().split(' ');
        date !== ''
            ? setDate(`${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}  `)
            : '';
        // setDate(date);
        setCurrentDate(false)
        hideDatePicker();
    };

    const getDate = () => {


    };

    // const getCurrentDate = ()=>{
    //     setCurrentDate(true)
    //     var date = new Date().getDate().toString();
    //     var month = new Date().getMonth() + 1;
    //     var year = new Date().getFullYear();
    //     setDate(`${date}-${month}-${year}`)
    // }

    const getCurrentDate = () => {
        setCurrentDate(true);

        const currentDate = new Date();

        const date = currentDate.getDate().toString();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        // Ensure month is formatted as MM (e.g., '01' for January)
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;

        const formattedDate = `${date}-${formattedMonth}-${year}`;

        setDate(formattedDate);
    };

    // date area ends

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
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
           
                    
            <ScrollView style={styles.scrollView}>
            
                <View>
                    <Text style={styles.text} aria-label="Label for Bedroom" nativeID="labelBedroom">Number of BedRooms</Text>
                    <CustomDropDown onChange={(value) => setBedRoom(value.label)} data={bedroomData} 
                            label='Number Of Bedrooms' defaultValue={bedroom} style={{}}  />
                    {/* <TextInput style={styles.input} onChangeText={(text)=>{setBedRoom(text),console.log("value of bedroom",bedroom)}} inputMode='numeric'/> */}
                    {/* <DropDownPicker

                        open={bedOpen}
                        value={bedroom}
                        items={bedroomitems}
                        setOpen={setBedOpen}
                        setValue={setBedRoom}
                        setItems={setBedRoomItems}
                        placeholder={'Select Number of Bedrooms.'}
                        autoScroll={true}
                        style={styles.dropdown}
                        scrollViewProps={{
                            nestedScrollEnabled: true
                        }}
                        dropDownContainerStyle={styles.dropDownContainer}
                        labelStyle={styles.label}
                        zIndex={6000}
                    /> */}
                    <Text style={styles.text} aria-label="Label for Bathroom" nativeID="labelBathroom">Number of BathRooms</Text>
                    {/* <TextInput style={styles.input} onChangeText={(text)=>setBathRoom(text)} inputMode='numeric' aria-label="input" aria-labelledby="labelBathroom" /> */}
                    {/* <DropDownPicker
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
                    /> */}
                     <CustomDropDown onChange={(value) => setBathRoom(value.label)} data={bathroomData} 
                            label='Number Of Bathrooms' defaultValue={bathroom} style={{}}  />
                    <Text style={styles.text} aria-label="Label for Floor" nativeID="labelFloor">Number of Floors</Text>
                    {/* <TextInput style={styles.input} onChangeText={(text)=>setFloor(text)} inputMode='numeric' aria-label="input" aria-labelledby="labelFloor" /> */}
                    {/* <DropDownPicker
                        open={floorOpen}
                        value={floor}
                        items={flooritems}
                        autoScroll={false}
                        setOpen={setFloorOpen}
                        setValue={setFloor}
                        setItems={setFloorItems}
                        placeholder={'Select Number of Floors.'}
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropDownContainer}
                        labelStyle={styles.label}
                        itemSeparator={true}
                        zIndex={4000}
                    /> */}
                    <CustomDropDown onChange={(value) => setFloor(value.label)} data={floorData} 
                            label='Number Of Floors' defaultValue={floor} style={{}}  />
                    <Text style={[styles.text, { marginBottom: scaledSize(10) }]} aria-label="Label for Date" nativeID="labelFloor">Available From</Text>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                        {!date ? <TouchableOpacity onPress={() => { getCurrentDate() }}>
                            <View style={{ borderRadius: scaledSize(5), borderColor: 'lightgrey', marginBottom: scaledSize(10), justifyContent: 'center', alignItems: 'center', width: scaledSize(100), height: scaledSize(40), backgroundColor: 'lightBlue', borderWidth: 1 }}>
                                <Text style={{ color: 'black' }}>Immediately</Text>
                            </View>
                        </TouchableOpacity> : null}
                        {!currentDate ? <TouchableOpacity onPress={() => { showDatePicker() }}>
                            <View style={{ borderRadius: scaledSize(5), borderColor: 'lightgrey', marginBottom: scaledSize(10), justifyContent: 'center', alignItems: 'center', width: scaledSize(100), height: scaledSize(40), backgroundColor: 'lightBlue', borderWidth: 1 }}>
                                <Text style={{ color: 'black' }}>Select Date</Text>
                            </View>
                        </TouchableOpacity> : null}
                    </View>
                    {date ? <Text style={styles.input}>{date}</Text> : null}

                    {/* <Button  onPress={showDatePicker} title="Select Date"  /> */}
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}

                    />
                    {/* <Text>{date.toString()}</Text> */}

                    <Text style={styles.text} aria-label="Label for Construction Age" nativeID="labelConstructionAge">Construction Age</Text>
                    {/* <DropDownPicker
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
                    /> */}
                    <CustomDropDown onChange={(value) => setAge(value.label)} data={ageData} 
                            label='Construction Age' defaultValue={bathroom} style={{}}  />
                    <Text style={styles.text} aria-label="Label for Plot Width" nativeID="labelPlotWidth">Plot Width</Text>
                    <TextInput style={styles.input} onChangeText={(text) => setPlotWidth(text)} inputMode='decimal' aria-label="input" aria-labelledby="labelPlotWidth" />
                    <Text style={styles.text} aria-label="Label for Plot Length" nativeID="labelPlotLength">Plot Length</Text>
                    <TextInput style={styles.input} onChangeText={(text) => setPlotLength(text)} inputMode='decimal' aria-label="input" aria-labelledby="labelPlotLength" />
                    <Text style={styles.text} aria-label="Label for Total Size" nativeID="labelTotalSize">Total Size in Square Feet</Text>
                    <TextInput style={styles.input} onChangeText={(text) => setSize(text)} inputMode='decimal' aria-label="input" aria-labelledby="labelTotalSize" />
                    <Text style={styles.text} aria-label="Label for Monthly Rent" nativeID="labelRent">Monthly Rent</Text>
                    <TextInput style={styles.input} onChangeText={(text) => setMonthlyRent(text)} inputMode='decimal' aria-label="input" aria-labelledby="labelRent" />
                    <Text style={styles.text} aria-label="Label for Security Amount" nativeID="labelSecurityAmount">Security Amount</Text>
                    <TextInput style={styles.input} onChangeText={(text) => setSecurityAmount(text)} inputMode='decimal' aria-label="input" aria-labelledby="labelSecurityAmount" />
                    <Text style={styles.text} aria-label="Label for Maintenance Charge" nativeID="labelMaintenanceChrg">Maintenance Charge</Text>
                    <TextInput style={styles.input} onChangeText={(text) => setMaintenanceCharge(text)} inputMode='decimal' aria-label="input" aria-labelledby="labelMaintenanceChrg" />
                    <Text style={styles.text} aria-label="Label for City" nativeID="labelCity">City</Text>
                    {/* <DropDownPicker
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
                    /> */}
                    <CustomDropDown onChange={(value) => setCity(value.label)} data={cityData} 
                            label='City' defaultValue={city} style={{}}  />
                    <Text style={styles.text} aria-label="Label for Address" nativeID="labelAddress">Address</Text>
                    <TextInput style={[styles.input, { height: scaledSize(60) }]} numberOfLines={2} onChangeText={(text) => setAddress(text)} inputMode='text' aria-label="input" aria-labelledby="labelAddress" />
                    <Text style={styles.text} aria-label="Label for Maintenance Frequency" nativeID="labelmaintenanceFrq">Maintenance Frequency</Text>
                    {/* <DropDownPicker
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
                    /> */}
                    <CustomDropDown onChange={(value) => setMaintenanceFrequency(value.label)} data={maintenanceFrequencyData} 
                            label='Maintenance Frequency' defaultValue={maintenanceFrequency} style={{}}  />
                    <Text style={styles.text} aria-label="Label for Furnished Type" nativeID="labelFurnishedType">Furnished Type</Text>
                    {/* <DropDownPicker
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
                    /> */}
                    <CustomDropDown onChange={(value) => setFurnishedType(value.label)} data={furnishedData} 
                            label='Furnished Type' defaultValue={furnishedType} style={{}}  />
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
                    {selectedImages.length > 0 ? <View>
                        <FlatList
                            data={selectedImages}
                            renderItem={renderImageItem}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal={true}
                        />
                        <TouchableOpacity onPress={() => { value === "gallery" ? openImagePicker() : handleCameraLaunch() }}>
                            <Text style={styles.text}>Add More Images</Text>
                        </TouchableOpacity>
                    </View> : null}
                    <Text style={[styles.text, { marginTop: scaledSize(15) }]} aria-label="Label for Property Type Option" nativeID="labelPropertyTypOption">Property Type Option</Text>
                    {/* <DropDownPicker
                        open={propertyOpen}
                        value={propertyType}
                        items={propertyitems}
                        setOpen={setPropertyOpen}
                        setValue={setPropertyType}
                        setItems={setPropertyItems}
                        placeholder={'Select Property Type.'}
                        style={[styles.dropdown, { marginBottom: scaledSize(10) }]}
                        dropDownContainerStyle={styles.dropDownContainer}
                        labelStyle={styles.label}
                        zIndex={2000}
                    /> */}
                    <CustomDropDown onChange={(value) => setPropertyType(value.label)} data={propertyData} 
                            label='Property Type' defaultValue={propertyType} style={{}}  />
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
    label: {
        borderRadius: scaledSize(25),
        color: 'red',
        paddingLeft: scaledSize(18),
    },
    dropdown: {
        height: scaledSize(50),
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E0DFE4',
        borderRadius: scaledSize(40),
        marginTop: scaledSize(10)
    },
    scrollView: {
        marginHorizontal: 20,
    },
    text: {
        fontFamily: Fonts.regular,
        color: 'black',
        fontWeight: '600',
        paddingTop: scaledSize(10)
    },
    image: {
        width: 200,
        height: 200,
    },
    container: {
        backgroundColor: 'white',
        borderWidth: 1, borderColor: '#E0DFE4',
        borderRadius: scaledSize(40),
    },
    dropDownContainer: {
        backgroundColor: "white",
        borderColor: "#E0DFE4"
    },
    deleteIconContainer: {
        position: 'absolute',
        top: 0,
        left: 170,
        padding: 10,
        // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
});