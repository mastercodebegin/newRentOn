import { View, Text, TouchableOpacity, Button, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { launchImageLibrary, launchCamera, ImagePickerResponse, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker';
import { TextInput, StyleSheet, ScrollView } from 'react-native'
import { scaledSize } from '../../helper/util/Utilities'
import { Fonts } from '../../utilits/GlobalAssets';

import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomDropDown from '../../component/CustomDropDown';

const UserRequirements = () => {

    const [selectedImages, setSelectedImages] = useState<{ uri: string; id: number }[]>([]);

    const [value, setValue] = useState("");

    const bedroomData = [
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
    const [bedroom, setBedRoom] = useState("")
    const [bathroom, setBathRoom] = useState("")
    const bathroomData = [
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
    const floorData = [
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
    const [city, setCity] = useState("")
    const cityData = [
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
    const [propertyType, setPropertyType] = useState("")
    const propertyData = [
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
        setCurrentDate(false);
        hideDatePicker();
        setDateError("")
    };
    


    const getCurrentDate = () => {
        setCurrentDate(true);
        setDateError("")

        const currentDate = new Date();

        const date = currentDate.getDate().toString();
        const monthIndex = currentDate.getMonth();
        const year = currentDate.getFullYear();

        const monthNames = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];

        const monthName = monthNames[monthIndex];

        const formattedDate = `${date}-${monthName}-${year}`;

        setDate(formattedDate);
    };

    const openImagePicker = () => {
        setValue("gallery");
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
            selectionLimit: 10,
        };

        launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('Image picker error: ', response.errorMessage);
            } else {
                const newImages = response.assets?.map((item, index) => ({
                    uri: item.uri as string,
                    id: index,
                })) ?? [];

                setSelectedImages(prevImages => [...newImages, ...prevImages]);
            }
            setSelectedImagesError("")
        });
    };

    const handleCameraLaunch = () => {
        setValue("camera");
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
                const newImageUri = response.assets?.[0]?.uri;
                if (newImageUri) {
                    const newImageObject = { uri: newImageUri, id: selectedImages.length };
                    setSelectedImages(prevImages => [newImageObject, ...prevImages]);
                }
                setSelectedImagesError("")
            }

        });
    };


    // const openImagePicker = () => {
    //     setValue("gallery")
    //     const options: ImageLibraryOptions = {
    //         mediaType: 'photo',
    //         includeBase64: false,
    //         maxHeight: 2000,
    //         maxWidth: 2000,
    //         selectionLimit: 5,
    //     };

    //     launchImageLibrary(options, (response: ImagePickerResponse) => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.errorMessage) {
    //             console.log('Image picker error: ', response.errorMessage);
    //         } else {
    //             let imageUri = response.assets?.[0] && response.assets[0].uri;
    //             setSelectedImages((prevImages) => [...prevImages, imageUri || '']);
    //         }
    //     });
    // };



    const deleteImage = (index: number) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);
    };


    const renderImageItem = ({ item, index }: { item: { uri: string; id: number }; index: number }) => (
        <View style={{ margin: 5, flex:1}}>
            {item && item.uri && (
                <Image source={{ uri: item.uri }} style={styles.image} />
            )}
            <TouchableOpacity
                style={styles.deleteIconContainer}
                onPress={() => deleteImage(index)}
            >
                <Icon name="closecircle" color="red" style={{ fontSize: 15 }} />
            </TouchableOpacity>
        </View>
    );

    const isNumericInput = (text) => {
        console.log(text, "value")
        return /^[0-9]+$/.test(text);
    };

    const handleNumericInputChange = (text, setStateFunction) => {
        if (isNumericInput(text)) {
            setStateFunction(text);
        }
    }

    // const handleSubmit = () => {
    //     if (!bedroom || !bathroom || !floor || !date || !age || !plotWidth || !plotLength || !size || !monthlyRent || !securityAmount || !maintenanceCharge || !city || !address || !maintenanceFrequency || !furnishedType || selectedImages.length === 0 || !propertyType) {
    //         console.error("Please fill in all required fields.",);
    //         console.log("state---", selectedImages.length)
    //         console.log("state---", bedroom)
    //     } else {
    //         console.log("Form submitted successfully!");
    //     }
    // };
  
  
  
  const [dateError, setDateError] = useState('');
  const [propertyTypeError, setPropertyTypeError] = useState("")
  const [furnishedTypeError, setFurnishedTypeError] = useState("")
  const [bedroomError, setBedroomError] = useState("");
  const [bathroomError, setBathroomError] = useState("");
  const [floorError, setFloorError] = useState("")
  const [ageError, setAgeError] = useState("")
  const [cityError, setCityError] = useState("")
  const [plotWidthError, setPlotWidthError] = useState("")
  const [plotLengthError, setPlotLengthError] = useState("")
  const [sizeError, setSizeError] = useState("")
  const [monthlyRentError, setMonthlyRentError] = useState("")
  const [securityAmountError, setSecurityAmountError] = useState("")
  const [maintenanceChargeError, setMaintenanceChargeError] = useState("")
  const [addressError, setAddressError] = useState("")
  const [maintenanceFrequencyError, setMaintenanceFrequencyError] = useState("")
  const [selectedImagesError, setSelectedImagesError] = useState("")
  // ... declare error states for other fields ...

  const handleSubmit = () => {
    // Validate each field and update the corresponding error state
    if (!bedroom) {
      setBedroomError("Please enter the number of bedrooms");
    } else {
      setBedroomError("");
    }
  
    if (!bathroom) {
      setBathroomError("Please enter the number of bathrooms");
    } else {
      setBathroomError("");
    }

    if (!floor) {
        setFloorError("Please enter the number of Floors");
      } else {
        setFloorError("");
      }

      if (!age) {
        setAgeError("Please enter the construction age");
    } else {
        setAgeError("");
    }

    if (!city) {
        setCityError("Please select city name");
      } else {
        setCityError("");
      }

    if (!plotWidthError) {
        setPlotWidthError("Please enter the plot width");
      } else {
        setPlotWidthError("");
      }
    if (!plotLengthError) {
        setPlotLengthError("Please enter the plot length");
      } else {
        setPlotLengthError("");
      }
    if (!sizeError) {
        setSizeError("Please enter the size in square feet");
      } else {
        setSizeError("");
      }
    if (!monthlyRentError) {
        setMonthlyRentError("Please enter the monthly rent");
      } else {
        setMonthlyRentError("");
      }
    if (!securityAmountError) {
        setSecurityAmountError("Please enter the security amount");
      } else {
        setSecurityAmountError("");
      }
    if (!maintenanceChargeError) {
        setMaintenanceChargeError("Please enter the maintenance charge");
      } else {
        setMaintenanceChargeError("");
      }
    if (!addressError) {
        setAddressError("Please enter the Address");
      } else {
        setAddressError("");
      }
    if (!maintenanceFrequencyError) {
        setMaintenanceFrequencyError("Please select the maintenance frequency");
      } else {
        setMaintenanceFrequencyError("");
      }
    if (!furnishedTypeError) {
        setFurnishedTypeError("Please select the furnished type");
      } else {
        setFurnishedTypeError("");
      }
    if (!propertyTypeError) {
        setPropertyTypeError("Please enter the property type");
      } else {
        setPropertyTypeError("");
      }
    if (!dateError) {
        setDateError("Please select the Available date");
      } else {
        setDateError("");
      }
    if (!selectedImagesError) {
        setSelectedImagesError("Please select the Property Images");
      } else {
        setSelectedImagesError("");
      }
    // ... validate other fields and update error states ...
  
    // Check if any errors exist
    if (!bedroomError && !bathroomError && !floorError && !ageError && !cityError && 
        !plotWidthError && !plotLengthError && !sizeError && !monthlyRentError && 
        !securityAmountError && !maintenanceChargeError && !addressError && !maintenanceFrequencyError &&
        !furnishedTypeError && !propertyTypeError && !dateError && !selectedImagesError ) {
      console.log("Form submitted successfully!",bedroom);
    } else {
      console.error("Please fill in all required fields.");
    }
  };
  




    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>


            <ScrollView style={styles.scrollView}>

                <View>
                    <Text style={styles.text} aria-label="Label for Bedroom" nativeID="labelBedroom">Number of BedRooms</Text>
                    <CustomDropDown onChange={(value) => {setBedRoom(value.label),setBedroomError("")}} data={bedroomData}
                        label='Number Of Bedrooms' defaultValue={bedroom} style={{}} />
                        {bedroomError ? <Text style={styles.errorText}>{bedroomError}</Text> : null}
                    <Text style={styles.text} aria-label="Label for Bathroom" nativeID="labelBathroom">Number of BathRooms</Text>
                    <CustomDropDown onChange={(value) => {setBathRoom(value.label),setBathroomError("")}} data={bathroomData}
                        label='Number Of Bathrooms' defaultValue={bathroom} style={{}} />
                        {bathroomError ? <Text style={styles.errorText}>{bathroomError}</Text> : null}
                    <Text style={styles.text} aria-label="Label for Floor" nativeID="labelFloor">Number of Floors</Text>
                    <CustomDropDown onChange={(value) => {setFloor(value.label),setFloorError("")}} data={floorData}
                        label='Number Of Floors' defaultValue={floor} style={{}} />
                        {floorError ? <Text style={styles.errorText}>{floorError}</Text> : null}
                    <Text style={[styles.text,]} aria-label="Label for Date" nativeID="labelFloor">Available From</Text>

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
                    {date ? <Text style={[styles.input, { padding: scaledSize(13) }]}>{date}</Text> : null}
                    {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}

                    />
                    <Text style={styles.text} aria-label="Label for Construction Age" nativeID="labelConstructionAge">Construction Age</Text>
                    <TextInput style={styles.input} placeholderTextColor={'lightgrey'} placeholder='00' onChangeText={(text) =>{ handleNumericInputChange(text, setAge),setAgeError("")}} inputMode='numeric' maxLength={2} aria-label="input" aria-labelledby="labelConstructionAge" />
                    {ageError ? <Text style={styles.errorText}>{ageError}</Text> : null}
                    <Text style={styles.text} aria-label="Label for Plot Width" nativeID="labelPlotWidth">Plot Width</Text>
                    <TextInput style={styles.input} placeholderTextColor={'lightgrey'} placeholder='0.0' onChangeText={(text) => {handleNumericInputChange(text, setPlotWidth),setPlotWidthError("")}} inputMode='numeric' maxLength={5} aria-label="input" aria-labelledby="labelPlotWidth" />
                    {plotWidthError ? <Text style={styles.errorText}>{plotWidthError}</Text> : null}
                    <Text style={styles.text} aria-label="Label for Plot Length" nativeID="labelPlotLength">Plot Length</Text>
                    <TextInput style={styles.input} placeholderTextColor={'lightgrey'} placeholder='0.0' onChangeText={(text) => {handleNumericInputChange(text, setPlotLength),setPlotLengthError("")}} inputMode='decimal' maxLength={5} aria-label="input" aria-labelledby="labelPlotLength" />
                    {plotLengthError ? <Text style={styles.errorText}>{plotLengthError}</Text> : null}
                    <Text style={styles.text} aria-label="Label for Total Size" nativeID="labelTotalSize">Total Size in Square Feet</Text>
                    <TextInput style={styles.input} placeholderTextColor={'lightgrey'} placeholder='0.0' onChangeText={(text) => {handleNumericInputChange(text, setSize),setSizeError("")}} inputMode='decimal' maxLength={6} aria-label="input" aria-labelledby="labelTotalSize" />
                    {sizeError ? <Text style={styles.errorText}>{sizeError}</Text> : null}
                    <Text style={styles.text} aria-label="Label for Monthly Rent" nativeID="labelRent">Monthly Rent</Text>
                    <TextInput style={styles.input} placeholderTextColor={'lightgrey'} placeholder='0.0' onChangeText={(text) => {handleNumericInputChange(text, setMonthlyRent),setMonthlyRentError("")}} inputMode='decimal' maxLength={7} aria-label="input" aria-labelledby="labelRent" />
                    {monthlyRentError ? <Text style={styles.errorText}>{monthlyRentError}</Text> : null}
                    <Text style={styles.text} aria-label="Label for Security Amount" nativeID="labelSecurityAmount">Security Amount</Text>
                    <TextInput style={styles.input} placeholderTextColor={'lightgrey'} placeholder='0.0' onChangeText={(text) => {handleNumericInputChange(text, setSecurityAmount),setSecurityAmountError("")}} inputMode='decimal' maxLength={6} aria-label="input" aria-labelledby="labelSecurityAmount" />
                    {securityAmountError ? <Text style={styles.errorText}>{securityAmountError}</Text> : null}
                    <Text style={styles.text} aria-label="Label for Maintenance Charge" nativeID="labelMaintenanceChrg">Maintenance Charge</Text>
                    <TextInput style={styles.input} placeholderTextColor={'lightgrey'} placeholder='0.0' onChangeText={(text) => {handleNumericInputChange(text, setMaintenanceCharge),setMaintenanceChargeError("")}} inputMode='decimal' maxLength={6} aria-label="input" aria-labelledby="labelMaintenanceChrg" />
                    {maintenanceChargeError ? <Text style={styles.errorText}>{maintenanceChargeError}</Text> : null}
                    <Text style={styles.text} aria-label="Label for City" nativeID="labelCity">City</Text>
                    <CustomDropDown onChange={(value) => {setCity(value.label),setCityError("")}} data={cityData}
                        label='City' defaultValue={city} style={{}} />
                    {cityError ? <Text style={styles.errorText}>{cityError}</Text> : null}
                    <Text style={styles.text} aria-label="Label for Address" nativeID="labelAddress">Address</Text>
                    <TextInput style={[styles.input,]} numberOfLines={2} maxLength={150} placeholderTextColor={'lightgrey'} placeholder='Address' onChangeText={(text) => setAddress(text)} inputMode='text' aria-label="input" aria-labelledby="labelAddress" />
                    {addressError ? <Text style={styles.errorText}>{addressError}</Text> : null}
                    <Text style={styles.text} aria-label="Label for Maintenance Frequency" nativeID="labelmaintenanceFrq">Maintenance Frequency</Text>
                    <CustomDropDown onChange={(value) => {setMaintenanceFrequency(value.label),setMaintenanceFrequencyError("")}} data={maintenanceFrequencyData}
                        label='Maintenance Frequency' defaultValue={maintenanceFrequency} style={{}} />
                    {maintenanceFrequencyError ? <Text style={styles.errorText}>{maintenanceFrequencyError}</Text> : null}
                    <Text style={styles.text} aria-label="Label for Furnished Type" nativeID="labelFurnishedType">Furnished Type</Text>
                    <CustomDropDown onChange={(value) => {setFurnishedType(value.label),setFurnishedTypeError("")}} data={furnishedData}
                        label='Furnished Type' defaultValue={furnishedType} style={{}} />
                    {furnishedTypeError ? <Text style={styles.errorText}>{furnishedTypeError}</Text> : null}
                    <Text style={styles.text} aria-label="Label for Images" nativeID="labelPropertyImages">Property Images</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => { openImagePicker() }}>
                            <View style={{ borderRadius: scaledSize(5), borderColor: 'lightgrey', marginBottom: scaledSize(10), justifyContent: 'center', alignItems: 'center', width: scaledSize(100), height: scaledSize(40), backgroundColor: 'lightBlue', borderWidth: 1 }}>
                                <Text style={{ color: 'black' }}>Gallery</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleCameraLaunch() }}>
                            <View style={{ borderRadius: scaledSize(5), borderColor: 'lightgrey', marginBottom: scaledSize(10), justifyContent: 'center', alignItems: 'center', width: scaledSize(100), height: scaledSize(40), backgroundColor: 'lightBlue', borderWidth: 1 }}>
                                <Text style={{ color: 'black' }}>Camera</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {selectedImagesError ? <Text style={styles.errorText}>{selectedImagesError}</Text> : null}
                    {selectedImages.length > 0 ? <View> 
                        <Text style={styles.text}>Selected Images</Text>
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
                    <CustomDropDown onChange={(value) => {setPropertyType(value.label),setPropertyTypeError("")}} data={propertyData}
                        label='Property Type' defaultValue={propertyType} style={{ marginBottom: scaledSize(10) }} />
                        {propertyTypeError ? <Text style={styles.errorText}>{propertyTypeError}</Text> : null}
                    <TouchableOpacity onPress={handleSubmit}>
                        <View style={[styles.input, { padding: scaledSize(13), alignItems: 'center', justifyContent: 'center', backgroundColor: '#7d4eff', marginBottom: scaledSize(10),marginTop:scaledSize(5) }]}>
                            <Text style={{ color: '#fff', fontFamily: Fonts.regular }}>SUBMIT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default UserRequirements

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#FAF9F6',
        borderBottomColor: 'gray',
        elevation: 1,
        borderWidth: 1,
        padding: scaledSize(6),
        borderColor: '#E0DFE4',
        borderRadius: scaledSize(10),
        color: 'black'
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
        paddingBottom: scaledSize(8),
        marginTop: scaledSize(15)

    },
    image: {
        width: 120,
        height: 120,
        top: 0,
        right: 0,
        borderRadius: scaledSize(10),
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
        top: -3,
        right: -7,
        zIndex: 1,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 15,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: scaledSize(5),
    },
});