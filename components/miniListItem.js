import React from 'react';

import { Text, View,StyleSheet, Image} from 'react-native';

const ListItem = ({item}) => {

  var icon = null;
  if(item.includes('thunderstorm')){
    icon = require('../icons/Thunderstorms.png')
  }else if(item.includes('drizzle')){
    icon = require('../icons/SlightDrizzle.png')
  }else if(item.includes('light rain')){
    icon = require('../icons/SlightDrizzle.png')
  }else if(item.includes('snow')){
    icon = require('../icons/Snow.png')
  }else if(item.includes('sleet')){
    icon = require('../icons/Snow.png')
  }else if(item.includes('rain')){
    icon = require('../icons/Drizzle.png')
  }else if(item.includes('clear')){
    icon = require('../icons/Sunny.png')
  }else if(item.includes('few clouds')){
    icon = require('../icons/MostlyCloudy.png')
  }else if(item.includes('scattered clouds')){
    icon = require('../icons/MostlyCloudy.png')
  }else if(item.includes('broken clouds')){
    icon = require('../icons/Cloudy.png')
  }else if(item.includes('overcast clouds')){
    icon = require('../icons/Cloudy.png')
  }else{
    icon = require('../icons/Haze.png')
  }

  return (
    <View style={styles.listItem}>
      <Image source={icon} style={styles.image}/>
      <Text style={styles.listItemText2}>{item}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    marginBottom: 4
  },
  imageView:{
  },
  image: {
    width: 24,
    height: 24,
    resizeMode: 'stretch',
  },
  temperatureText: {
    marginTop: 6,
    fontSize: 26,
    color: "#ffffff",
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
  listItemText2: {
    margin: 2,
    fontSize: 13,
    color: "#ffffff",
    opacity: 0.9
  },
  listItemTextTemp: {
    fontSize: 42,
    color: "#ffffff",
  },
  checkedItemText: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: 'green',
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 70,
  },
  editItemInput: {
    fontSize: 18,
  },
});

export default ListItem;