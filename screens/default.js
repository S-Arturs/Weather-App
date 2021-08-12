import React from 'react';
import {Image, Text, View, Dimensions, ActivityIndicator, FlatList, StyleSheet, StatusBar, Pressable } from 'react-native';
import {LineChart} from "react-native-chart-kit";
import ListItem from '../components/listItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import {SharedElement} from 'react-navigation-shared-element';
import {apiKey} from '../apiKey'

let freshMount = true;
let firstDay = 9;
let previousCity = "";
let longitude;
let latitude;
let URL="";
let units;
let unitsURL;
let screenWidth = Dimensions.get("window").width;

const chartConfig = {
decimalPlaces: 0,
backgroundColor: "#fff",
backgroundGradientFrom: "#fff",
backgroundGradientTo: "#fff",
fillShadowGradient: "#fff",
fillShadowGradientOpacity: 0.3,
decimalPlaces: 0, 
backgroundGradientFromOpacity: 0.0,
backgroundGradientToOpacity: 0.0,
color: (opacity = 0.5) => `rgba(255, 255, 254, ${opacity})`,
labelColor: (opacity = 1) => `rgba(255, 255, 254, ${opacity})`,
style: {
  borderRadius: 16
},
propsForDots: {
  r: "0",
  strokeWidth: "2",
  stroke: "#fff"
}
}

class Default extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          listUnits: "°C",
          isGettingLocation: true,
          longitude: 0,
          lattitude: 0,
          isLoading: true,
          data: [],
          dayData: [],
          graphData: {
            labels: [],
            datasets: [
                {
                    data: [                       
                    ]
                }
            ]
        },
        city: ""
        }
    } 
    componentWillUnmount() {
      freshMount = true;
    }
    //fetching data from openweathermap.org free api
    GetData = () => {
        const location = this.props.route.params.location;
        if(freshMount)
        {
          if(this.props.route.params.units){
            unitsURL = "metric";
            units = "°C";
          }
          else{
            unitsURL = "imperial";
            units = "°F";
          }
          if(this.props.route.params.GPS)
          {Geolocation.getCurrentPosition(
            (position) => {
              latitude = position.coords.latitude;
              longitude = position.coords.longitude;
              URL=`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unitsURL}`
              this.setState({
                isGettingLocation: false,
              })
            },
            (error) => {
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )}
        else{
          URL=`https://api.openweathermap.org/data/2.5/forecast?${location}&appid=${apiKey}&units=${unitsURL}`
          this.setState({
            isGettingLocation: false,
          })
        }
          if(!this.state.isGettingLocation)
          {
          previousCity = location;
          freshMount = false;
          return fetch(URL)
            .then((response) => response.json())
            .then((responseJson) => {

                this.dataProcessing(responseJson)                
        })
        .catch((error) =>{
          console.error(error);
        });}}
    }
    //pretty image at the bottom of the screen
    footer = () => {
      return( <Image
              style={styles.imageHills}
              source={require('../images/Hills.png')}
            />
      )
    }

    //taking api response json and extracting valuable information to show to the user
    dataProcessing (responseJson){
      const dataClone = {...this.state.graphData};
                try {
                  const values = responseJson.list.map(value => value.main.temp);
                } catch (error) {
                  this.props.navigation.navigate('Main',{error: true});
                }

                const values = responseJson.list.map(value => value.main.temp);
                dataClone.datasets[0].data = values;

                let array=[]

                let date = responseJson.list[0].dt_txt.split(" ");

                  let numberOfFirstDay = 0;

                  for (let i = 0; i < 5; i++) {
                    if(responseJson.list[i].dt_txt.includes(date[0])){
                      numberOfFirstDay ++;
                    }
                  }

                  if(numberOfFirstDay < 3){
                    responseJson.list[0].WeekDay = "Today"
                    array = [...array, responseJson.list[0]];
                  }
                  
                for(let index = 0; index < responseJson.list.length; index ++){
                  let localDate = responseJson.list[index].dt_txt.split(" ");
                  let localMonth = localDate[0].split("-")
                  responseJson.list[index].month = localMonth[1]
                  let localDate2 = new Date(localMonth[0], localMonth[1]-1, localMonth[2])
                  const day1 = localDate2.getDay();
                  responseJson.list[index].day = localMonth[2];

                  switch(day1) {
                    case 0:
                      responseJson.list[index].WeekDay = "Sunday"
                      if(firstDay == 9){
                        firstDay = day1
                      }
                      else if(day1 != firstDay && firstDay != 9){
              
                      }
                      break;
                    case 1:
                      responseJson.list[index].WeekDay = "Monday"
                      if(firstDay == 9){
                        firstDay = day1
                      }
                      break;
                    case 2:
                      responseJson.list[index].WeekDay = "Tuesday"
                      if(firstDay == 9){
                        firstDay = day1
                      }
                      break;
                    case 3:
                      responseJson.list[index].WeekDay = "Wednesday"
                      if(firstDay == 9){
                        firstDay = day1
                      }
                      break;
                    case 4:
                      responseJson.list[index].WeekDay = "Thursday"
                      if(firstDay == 9){
                        firstDay = day1
                      }
                      break;
                    case 5:
                      responseJson.list[index].WeekDay = "Friday"
                      if(firstDay == 9){
                        firstDay = day1
                      }
                      break;
                    case 6:
                      responseJson.list[index].WeekDay = "Saturday"
                      if(firstDay == 9){
                        firstDay = day1
                      }
                      break;
                    default:
                      responseJson.list[index].WeekDay = "Unknown"
                      break;
                  }

                  if(firstDay == day1){
                    responseJson.list[index].WeekDay = "Today"
                  }
                  
                  responseJson.list[index].main.feels_like = Math.round(responseJson.list[index].main.feels_like);
                  responseJson.list[index].main.temp = Math.round(responseJson.list[index].main.temp);
                  responseJson.list[index].time = localDate[1];
                  responseJson.list[index].time = responseJson.list[index].time.substring(0, 5);

                  let detalizedGraphDataTemp = {
                    labels: [""],
                    dataset: [
                        {
                            data: [
                                0
                            ]
                        }
                    ]
                  }  
                  responseJson.list[index].detalizedGraphData = detalizedGraphDataTemp;
                  if(responseJson.list[index].dt_txt.includes("15:00")){
                    array = [...array, responseJson.list[index]];
                  }
                }

                  let arrayOfArrays = [];
                  let arrayOfLabels = [];
                  let arrayOfWeathers = [];
                  let singularArray = [];
                  let singularTimeArray = [];
                  let singularWeatherArray = [];
                  let currentDay = responseJson.list[0].WeekDay;
                  let previousDay = currentDay;
                  let dayCounter = 0;

                  for(let index = 0; index < responseJson.list.length; index ++){      
                    currentDay = responseJson.list[index].WeekDay
                    
                    if(previousDay != currentDay || index == responseJson.list.length-1 ){

                    arrayOfArrays[dayCounter] = singularArray;
                    arrayOfLabels[dayCounter] = singularTimeArray;
                    arrayOfWeathers[dayCounter] = singularWeatherArray;

                    dayCounter++;

                    singularArray = [];
                    singularTimeArray = [];
                    singularWeatherArray = [];
                    previousDay = currentDay;  
                    }
                    singularArray = [...singularArray, responseJson.list[index].main.temp]  
                    singularTimeArray = [...singularTimeArray, responseJson.list[index].time]  
                    singularWeatherArray = [...singularWeatherArray, responseJson.list[index].time + ':  ' + responseJson.list[index].weather[0].description]
                    
                  }
                                   
                  for(let index = 0; index < array.length; index++){
                    array[index].detalizedGraphData.dataset[0].data = arrayOfArrays[index];
                    array[index].detalizedGraphData.labels = arrayOfLabels[index];
                    array[index].weatherOfDay = arrayOfWeathers[index];
                    array[index].listUnits = units;
                  }
                
                for(let index = 0; index < array.length; index++){
                  dataClone.labels[index]=array[index].WeekDay
                }
                this.setState({
                    listUnits: units,
                    isLoading: false,
                    data: responseJson,
                    dayData: array,
                    graphData: dataClone,
                    city: responseJson.city.name
                });
    }
    render() {
        this.GetData();
            return(
              <View style={{
                flex: 1,  
            }}>
            <SharedElement id='sky'>
                  <Image
                  style={styles.imageSky}
                  source={require('../images/Sky.png')}
                  />
            </SharedElement>
            {this.state.isLoading ? 
              <View style={{
                flex: 1, 
                alignItems: 'center',
                justifyContent: 'center', 
            }}>
            <ActivityIndicator size="large" color="#fff"/>
            </View>  
            : 
            <View style={{color: '#fff', paddingTop: 28}} >      
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={styles.cityName}>
            <View style={{flex:0.25, paddingLeft:16}}>
            <Pressable style={styles.button2} title ='Use current location' onPress={() => {
                this.props.navigation.navigate('Main',{error: true});
            }}>
            <Ionicons
              style={styles.smallText}
              name="arrow-back"
              >
            </Ionicons>
            </Pressable>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Ionicons
              style={{ fontSize: 40, color: 'white', paddingTop: 6}}
              name="location-sharp"
              >
            </Ionicons>
            <Text style={{ fontSize: 36, color: 'white', textAlign: 'center'}}>{this.state.city}</Text>
            </View>
            <View style={{flex:0.25, paddingRight:16}}>

            </View>
            </View>
              <LineChart
                  verticalLabelRotation = {15}
                  withVerticalLines={false}
                  data={this.state.graphData}
                  width={screenWidth-20} 
                  height={130}
                  yAxisSuffix={units}
                  chartConfig={chartConfig}
                  bezier
                  style={{
                      paddingBottom: 25,
                      marginTop: 2,
                  }}
              />
            <FlatList
            key={this.state.dayData.dt}
            data={this.state.dayData}
            keyExtractor={(item, index) => item.dt}
            overScrollMode = {'never'}
            ListFooterComponent={<Image
              style={{width: screenWidth, height: screenWidth/1.5, marginBottom: screenWidth/2, resizeMode: 'stretch'}}
              source={require('../images/Hills.png')}
            />}
            renderItem={({ item }) => (
            <ListItem item={item} />
            )        
          }
          />
          </View> 
          }  
          <SharedElement id='hills'>
          <Image
            style={styles.imageHills}
            source={require('../images/Hills.png')}
          />
          </SharedElement>
          </View>              
        );}}

const styles = StyleSheet.create({
  smallText:{
    padding: 5,
    textAlign: 'center',  
    color: '#fff',
    fontSize: 40,
    borderColor: '#eee',
},
  button2:{
    flexDirection: 'row',
    textAlign: 'center',
    fontSize: 20,     
    borderRadius: 25,
    borderColor: '#eee',
    width: 50,
    height: 50
},
  cityName: {
    justifyContent: 'center',
    fontSize: 40, 
    color: 'white',
    flexDirection: 'row'
  },
  imageSky: {
    position: 'absolute',
    top: screenWidth/-1.5,
    backgroundColor: '#fff',
    height: screenWidth/1.5,
    width: screenWidth,
    resizeMode: 'stretch',
    flex: 1,
  },
  imageHills: {
    position: 'absolute',
    top: screenWidth/1.5,
    height: screenWidth/1.5,
    width: screenWidth,
    resizeMode: 'stretch',
    flex: 1,
  }
})

Default.sharedElements = () => [
  {id: 'hills'},
  {id: 'sky'}
];

export default Default;