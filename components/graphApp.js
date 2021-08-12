import React from 'react';
import {Text,View,Dimensions,ActivityIndicator} from 'react-native';
import {LineChart} from "react-native-chart-kit";

var counter2 = 0;

const data = {
  labels: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
  datasets: [
    {
      data: [100,200,300]
    }
  ]
}

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
    r: "3",
    strokeWidth: "2",
    stroke: "#fff"
  }
}
class GraphApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           isLoading: true,
           data: {
               labels: ["Today", "Monday", "Tuesday", "Wednesday", "Thursday"],
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
          console.log("GraphFetch")
        return fetch('https://api.openweathermap.org/data/2.5/forecast?q=Riga&appid=bf4f79f4ebbbdfea0ed4565c5c87cba3&units=metric')
            .then((response) => response.json())
            .then((responseJson) => {
    
                // clone the data from the state
                const dataClone = {...this.state.data}
    
                const values = responseJson.list.map(value => value.main.temp);
                dataClone.datasets[0].data = values;
        
                this.setState({
                    isLoading: false,
                    data: dataClone,
                    city: responseJson.city.name
                });
        })
        .catch((error) =>{
          console.error(error);
        });}
    }

    


    render() {
    
        // since we're now referencing this.state.data, its value 
        // will be updated directly when we update the state
        this.GetData()
        //console.log(this.state.isLoading)
        if(this.state.isLoading){
            return(
                <View>
                <LineChart
                    data={defaultData}
                    width={Dimensions.get("window").width} // from react-native
                    height={200}
                    yAxisLabel={"$"}
                    chartConfig={chartConfig}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
            )}
        else
        {{return (
          <View>
             <Text style={{ fontSize: 40, color: 'white', textAlign: 'center'}}>{this.state.city}</Text>
              <LineChart
                  //withDots={false}
                  withVerticalLines={false}
                  data={this.state.data}
                  width={Dimensions.get("window").width-20} // from react-native
                  height={200}
                  yAxisSuffix={"℃"}
                  chartConfig={chartConfig}
                  bezier
                  style={{
                      marginVertical: 8,
                      borderRadius: 16
                  }}
              />
          </View>
        );}}
    }
}

export default GraphApp;