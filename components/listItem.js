import React, {useState} from 'react';
import { FlatList, Text, View, Dimensions, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { LineChart } from "react-native-chart-kit";
import Animated from 'react-native-reanimated';
import MiniListItem from './miniListItem'

var defaultData = {
}

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
    r: "3",
    strokeWidth: "2",
    stroke: "#fff"
  }
  }


const ListItem = ({item}) => {
  var icon = null;
   switch(item.weather[0].icon){
    case '01d':
      icon = require('../icons/Sunny.png')
      break;
    case '01n':
      icon = require('../icons/Sunny.png')
      break;
    case '02d':
      icon = require('../icons/MostlyCloudy.png')
      break;
    case '02n':
      icon = require('../icons/MostlyCloudy.png')
      break;
    case '03d':
      icon = require('../icons/Cloudy.png')
      break;
    case '03n':
      icon = require('../icons/Cloudy.png')
      break;
    case '04d':
      icon = require('../icons/Cloudy.png')
      break;
    case '04n':
      icon = require('../icons/Cloudy.png')
      break;
    case '09d':
      icon = require('../icons/Drizzle.png')
      break;
    case '09n':
      icon = require('../icons/Drizzle.png')
      break;
    case '10d':
      icon = require('../icons/SlightDrizzle.png')
      break;
    case '10n':
      icon = require('../icons/SlightDrizzle.png')
      break;
    case '11d':
      icon = require('../icons/Thunderstorms.png')
      break;
    case '11n':
      icon = require('../icons/Thunderstorms.png')
      break;
    case '13d':
      icon = require('../icons/Snow.png')
      break;
    case '13n':
      icon = require('../icons/Snow.png')
      break;
    case '50d':
      icon = require('../icons/Haze.png')
      break;
    case '50n':
      icon = require('../icons/Haze.png')
      break;
    default:
      icon =  require('../icons/01n.png')
      break;
  }

  defaultData.labels = item.detalizedGraphData.labels;
  defaultData.datasets = item.detalizedGraphData.dataset;

  const [expanded, expand] = useState(false);
  return (
    <TouchableOpacity style={styles.listItemExpanded} onPress={() => expand(!expanded)}> 
    <Animated.View style={styles.listItem}>
          <View style={styles.secondaryListItem}>
          <Text style={styles.listItemText}>{item.WeekDay}</Text>
          <View style={styles.thirdListItem}>
            <View>
            <Image
            style={styles.image}
            source={icon}
            />
            </View>
          <Text style={styles.listItemTextTemp}> {item.main.temp}</Text>
          <Text style={styles.temperatureText}> {item.listUnits}  </Text>
          </View>
          </View>
          <View style={styles.humidityFeelsLikeListItem}>
            <Text style={styles.listItemText}>humidity: {item.main.humidity}%</Text>
            <Text style={styles.listItemText}>{item.weather[0].description}</Text>
            <Text style={styles.listItemText}>feels like: {item.main.feels_like}{item.listUnits}</Text>
          </View>
    </Animated.View>
    {expanded? (
    <View>
     <LineChart
         verticalLabelRotation = {30}
         withVerticalLines={false}
         data={defaultData}
         width={Dimensions.get("window").width-80} // from react-native
         height={175}
         yAxisSuffix={item.listUnits}
         chartConfig={chartConfig}
         bezier
         style={{
            paddingBottom: 10,
             marginVertical: 8,
             borderRadius: 0
         }}
     />
     <FlatList
            style={styles.flatlist}
            key={item.weatherOfDay}
            data={item.weatherOfDay}
            keyExtractor={(item, index) => item}
            ListFooterComponent={<View style={{height: 0}}/>}
            renderItem={({ item }) => (
              <MiniListItem item={item}/>
            )}
          />
 </View>
    ) : <View></View>}
    </TouchableOpacity>   
  );
};

const styles = StyleSheet.create({
  flatlist: {
    marginLeft: 24,
    marginBottom: 4
  },
  image: {
    width: 64,
    height: 64,
    resizeMode: 'stretch',
  },
  temperatureText: {
    marginTop: 6,
    fontSize: 26,
    color: "#ffffff",
  },
  listItemExpanded: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
    paddingBottom: 6,
    paddingLeft: 20,
    marginLeft: 20,
    borderRadius: 16,
    marginTop: 0,
    marginBottom: 12,
    backgroundColor: 'rgba(240, 240, 255, 0.16)',
    borderBottomWidth: 0,
    borderColor: '#eee',
    width: Dimensions.get("window").width-40
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
  },
  secondaryListItem: {
    flex: 1,
    flexDirection: 'column',
  },
  humidityFeelsLikeListItem: {
    paddingLeft: 12,
    paddingTop: 6,
    flex: 1,
    flexDirection: 'column',
  },
  thirdListItem: {
    flex: 1,
    flexDirection: 'row',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 18,
    color: "#ffffff",
  },
  listItemTextTemp: {
    fontSize: 42,
    color: "#ffffff",
  },
});

export default ListItem;