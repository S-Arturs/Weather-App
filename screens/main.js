import React, { useState } from 'react';
import latinize from 'latinize';
import { StyleSheet, View, Text, TextInput, Dimensions, StatusBar, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Autocomplete from 'react-native-autocomplete-input';
import loadLocalResource from 'react-native-local-resource'
//list of cities for autocomplete component to suggest
import data1 from '../json/data_1.txt';
import data3 from '../json/data_3.txt';
import data4 from '../json/data_4.txt';
import data5 from '../json/data_5.txt';
import data6 from '../json/data_6.txt';
import data7 from '../json/data_7.txt';
import data8 from '../json/data_8.txt';
import data9 from '../json/data_9.txt';
import data10 from '../json/data_10.txt';
import { SharedElement} from 'react-navigation-shared-element';

//placeholder list just in case
let cityListData =  [{id: 0, name: "Globe", state: "", country: ""},{id: 1, name: "Globe", state: "", country: ""}]
let dataLoaded = false;
let previousQueries = [];
let previousText ='';
let screenWidth = Dimensions.get("window").width;
export default function Main(){
    if(!dataLoaded)
    //sequential city list data loading to avoid react native memory bug crashing the app
    {loadLocalResource(data1).then((content) => {
        cityListData = content
    loadLocalResource(data3).then((content) => {
        cityListData = cityListData.concat(content)
    loadLocalResource(data4).then((content) => {
        cityListData = cityListData.concat(content)
    loadLocalResource(data5).then((content) => {
        cityListData = cityListData.concat(content)
    loadLocalResource(data6).then((content) => {
        cityListData = cityListData.concat(content)
    loadLocalResource(data7).then((content) => {
        cityListData = cityListData.concat(content)
    loadLocalResource(data8).then((content) => {
        cityListData = cityListData.concat(content)
    loadLocalResource(data9).then((content) => {
        cityListData = cityListData.concat(content)
    loadLocalResource(data10).then((content) => {
        cityListData = cityListData.concat(content);
        cityListData = JSON.parse(cityListData);
        dataLoaded = true;
        previousQueries = cityListData;
        changeUnitsBool(unitsBool);                                          
        })
        })
        })
        })
        })
        })
        })
        })
      })}
    
    let units;
    const [text, changeText] = useState('');
    const navigation = useNavigation();
    const [unitsBool, changeUnitsBool] = useState(true);
    const [showResults, changeShowResults] = useState(false);
    const [showWeather, changeShowWeather] = useState(0);
    

    if(showWeather != 0){
        navigation.navigate('Default', {location: `id=${showWeather}`, GPS: false, units: unitsBool});   
        changeShowWeather(0)
    }
    let queriedCities
    if(previousText.length > text.length){
        previousQueries = cityListData;
    }
    if(text.length != 0)
        {      
        try{queriedCities = previousQueries.filter(word => latinize(word.name.toLowerCase()).includes(latinize(text.toLowerCase())));}
        catch (exception){
            console.log('failed');
        }
        previousQueries = queriedCities;
        previousText = text;
    }
    if(unitsBool){
        units = '°C'
    }
    else{
        units = '°F'
    }
    return(   
        <View
        style={{
            flex: 1, 
            alignItems: 'center',
            justifyContent: 'center', 
        }}>
        <TouchableWithoutFeedback onPress={()=>{
            changeShowResults(false);
            Keyboard.dismiss();
        }}>
        <View>
        <View style={{
            flex: 1, 
            alignItems: 'center',
            justifyContent: 'center', 
        }} >
            <SharedElement id='sky'>
            <Image
            style={styles.imageSky}
            source={require('../images/Sky.png')}
            />
            </SharedElement>
        
        </View>
        <View style={{
            flex: 1, 
            alignItems: 'center',
            justifyContent: 'center', 
        }} 
        >
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <Text style={styles.bigText}>Enter location</Text>

            <View style={{
            flex: 1, 
            alignItems: 'center',
            justifyContent: 'center'}}>
            <View style={styles.autocompleteContainer}>
            <Autocomplete
            inputContainerStyle={styles.autocomplete}
            hideResults={!showResults}
            data={ 
                text.length < 2 ? []: queriedCities
             }
            renderTextInput={() => (
                <TextInput 
                placeholder={'Location name'}
                style={styles.input}
                value={text}
                onChangeText={(city) =>{
                    changeText(city);
                    city.length < 2 ? changeShowResults(false) : changeShowResults(true)
                }}
                />
            )}
            flatListProps={{
            flexGrow: 0,
            backgroundColor: 'transparent',
            borderWidth: 0,
            borderRadius: 16,
            height: 174,
            keyboardShouldPersistTaps: 'always',
            keyExtractor: (item) => item.id,
            renderItem: ({item, i}) => (
              <TouchableOpacity style={styles.listNumber} onPress={() =>{
                changeShowResults(false);
                changeText(item.name)
                changeShowWeather(item.id)
            }}>
                <Text style={styles.itemText}>{item.name}, {item.country}  {item.state} </Text>
              </TouchableOpacity>
            ),
          }}
        />
        </View>
      </View>
            {!showResults || text.length < 2 ? 
            <>
            <View style={styles.useCurrentLocationButtonView}>
            <View style={{flex:0.30}}/>
            <TouchableOpacity style={styles.bigButton} title ='Continue' onPress={() => {           
                navigation.navigate('Default', {location: `q=${text}`, GPS: false, units: unitsBool});
            }}>
            <FontAwesome
            style ={styles.useCurrentLocation}
            name="location-arrow"
            >
            </FontAwesome>
            <Text style={styles.smallText}>Use entered location</Text>
            </TouchableOpacity>
            <View style={{flex:0.30}}/>
            </View>
            <Text style={styles.or}>
                or
            </Text>
            <View style={styles.useCurrentLocationButtonView}>
            <View style={{flex:0.30}}/>
            
            <TouchableOpacity style={styles.bigButton} title ='Use current location' onPress={() => {
                navigation.navigate('Default', {location: "", GPS: true, units: unitsBool});
            }}>
            <Ionicons
            style={styles.useCurrentLocation}
            name="location-sharp"
            ></Ionicons>
            <Text style={styles.smallText}>Use current location</Text>
            </TouchableOpacity>
            <View style={{flex:0.30}}>
            <TouchableOpacity style={styles.unitButton} title ='Units' onPress={() => {
               changeUnitsBool(!unitsBool)
            }}>
            <Text style={styles.smallText}>{units}</Text>
            </TouchableOpacity>
            </View>
            </View>
            </> :  null}
            
        </View>
        <View 
        style={{
            flex: 1, 
            alignItems: 'center',
            justifyContent: 'center', 
        }} >
        <SharedElement id='hills'>
        <Image
            style={styles.imageHills}
            source={require('../images/Hills.png')}
        />
        </SharedElement>
        </View>
        </View>
        </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    listNumber: {
        marginTop: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 16,
        padding: 10,
        borderColor: 'transparent',
        borderWidth: 0
    },
    itemText: {
        color: '#fff',
        borderWidth: 0,
        borderColor: 'transparent',
        borderWidth: 0
    },
    autocompleteContainer: {
        width: screenWidth/1.2,
        flex: 1,
        left: 0 - (screenWidth/1.2)/2,
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    useCurrentLocationButtonView:{
        flexDirection: 'row',
    },
    autocomplete:{
        borderColor: 'rgba(52, 52, 52, 0)',
        borderWidth: 0,
    },
    or:{
        textAlign: 'center',  
        color: '#fff',
        fontSize: 18,
        paddingBottom: 10,
    },
    useCurrentLocation:{
        fontSize: 20,
        color: '#fff',
        paddingLeft: 14,
        paddingRight: 6,
        paddingTop: 14,
    },
    input:{
        borderWidth: 0,
        fontSize: 20,
        padding: 12,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: screenWidth/1.2, 
    },
    bigText:{
        paddingBottom: 6,
        textAlign: 'center',
        fontSize: 40,
        color: '#fff',
    },
    smallText:{
        paddingTop: 10,
        textAlign: 'center',  
        color: '#fff',
        fontSize: 20,
        borderColor: '#eee',
    },
    bigButton:{
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 6,
        borderRadius: 16,
        marginBottom: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderBottomWidth: 0,
        borderColor: '#eee',
        width: screenWidth/1.7,     
        height: screenWidth/ 9
    },
    unitButton:{
        marginLeft:6,
        textAlign: 'center',
        fontSize: 20,    
        paddingBottom: 6, 
        borderRadius: 16,
        marginBottom: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: '#eee',
        height: screenWidth/ 9
    },
    imageSky: {
        height: screenWidth/1.5,
        width: screenWidth,
        resizeMode: 'stretch',
        flex: 1,
      },
    imageHills: {
        height: screenWidth/1.5,
        width: screenWidth,
        resizeMode: 'stretch',
        flex: 1,
      },

})

Main.sharedElements = () => [
    {id: 'hills'},
    {id: 'sky'}
  ];