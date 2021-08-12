import React from 'react';
import {Text,View,Dimensions,ActivityIndicator, FlatList, TouchableWithoutFeedback} from 'react-native';
import {LineChart} from "react-native-chart-kit";
import ListItem from './listItem';

var counter2 = 0;
let firstDay = 9;

const defaultData = {
  labels: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
  datasets: [
    {
      data: [100,200,300]
    }
  ]
}


const chartConfig = {
decimalPlaces: 0,
backgroundColor: "#fff",
backgroundGradientFrom: "#fff",
backgroundGradientTo: "#fff",
fillShadowGradient: "#fff",
fillShadowGradientOpacity: 0.3,
decimalPlaces: 0, // optional, defaults to 2dp
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

class GraphApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           isLoading: true,
           data: [],
           dayData: [],
           graphData: {
            labels: [],
            datasets: [
                {
                    data: [
                        1,1,1,1,1,1,1
                    ]
                }
            ]
        },
        city: "New York"
        }
    }
    
    GetData = () => {

        //console.log(this.state.isLoading)
        if(counter2 == 0)
        {
          counter2 ++;
          console.log("ListFetched")
        return fetch('https://api.openweathermap.org/data/2.5/forecast?q=Rezekne&appid=bf4f79f4ebbbdfea0ed4565c5c87cba3&units=metric')
            .then((response) => response.json())
            .then((responseJson) => {

                const dataClone = {...this.state.graphData};

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
                  

                for(let index = 0; index < 40; index ++){

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
                    labels: ["Today", "Monday", "Tuesday", "Wednesday", "Thursday"],
                    dataset: [
                        {
                            data: [
                                21,22,23,21,30,28
                            ]
                        }
                    ]
                  }

                
                  responseJson.list[index].detalizedGraphData = detalizedGraphDataTemp;
                  //console.log(responseJson.list[index].detalizedGraphData)
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

                  for(let index = 0; index < 40; index ++){      
                    currentDay = responseJson.list[index].WeekDay
                    if(previousDay == currentDay )        
                    {
                      singularArray = [...singularArray, responseJson.list[index].main.temp]  
                      singularTimeArray = [...singularTimeArray, responseJson.list[index].time]  
                      singularWeatherArray = [...singularWeatherArray, responseJson.list[index].time + ':  ' + responseJson.list[index].weather[0].description]
                    }                                                    
                   else{
                    arrayOfArrays[dayCounter] = singularArray;
                    arrayOfLabels[dayCounter] = singularTimeArray;
                    arrayOfWeathers[dayCounter] = singularWeatherArray;

                    dayCounter++;

                    singularArray = [];
                    singularTimeArray = [];
                    singularWeatherArray = [];
                    previousDay = currentDay;       
                    }
                  }

                  for(let index = 0; index < array.length; index++){
                    array[index].detalizedGraphData.dataset[0].data = arrayOfArrays[index];
                    array[index].detalizedGraphData.labels = arrayOfLabels[index];
                    array[index].weatherOfDay = arrayOfWeathers[index];

                  }
                

                console.log(array);
                for(let index = 0; index < array.length; index++){
                  dataClone.labels[index]=array[index].WeekDay
                }
                this.setState({
                    isLoading: false,
                    data: responseJson,
                    dayData: array,
                    graphData: dataClone,
                    city: responseJson.city.name
                });
        })
        .catch((error) =>{
          console.error(error);
        });}
    }

    render() {
        this.GetData()
        console.log(this.state.isLoading)
        if(this.state.isLoading){
            return(
                <View>
                <Text>Bazinga</Text>
            </View>
            )}
        else
        {{return (
          <View >
            <Text style={{ fontSize: 40, color: 'white', textAlign: 'center'}}>{this.state.city}</Text>
              <LineChart
                  //withDots={false}
                  withVerticalLines={false}
                  data={this.state.graphData}
                  width={Dimensions.get("window").width-20} // from react-native
                  height={120}
                  yAxisSuffix={"℃"}
                  chartConfig={chartConfig}
                  bezier
                  style={{
                      paddingBottom: 14,
                      marginVertical: 2,
                      borderRadius: 0
                  }}
              />
            <FlatList
            key={this.state.dayData.dt}
            data={this.state.dayData}
            keyExtractor={(item, index) => item.dt}
            ListFooterComponent={<View style={{height: 1000}}/>}
            renderItem={({ item }) => (
            <ListItem item={item} />
            )}
          />
          </View>
        );}}
    }
}

export default GraphApp;