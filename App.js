/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import {Text} from 'react-native-elements'
import axios from 'axios';
import T from './Table'
import {LineChart} from 'react-native-chart-kit'

// This is all the axios stuff that we don't need to care about
const endpoint = (
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=nation;areaName=england&' +
    'structure={"date":"date","newCases":"newCasesByPublishDate"}'
 );
 
const api = axios.create({
baseURL: endpoint 
})

async function getData() {
let data = await api.get().then(({ data }) => data).catch(error => console.log(error))
return data;
}


const App = () => {

    const [cases, setCases] = useState(0);
    const [dates, setDates] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        console.log("Updating")
        getData().then(({data}) => {
           d = data.map(e => e["date"]).slice(0,120)
           setDates(d.reverse())
           caseNo = data.map(e => e["newCases"]).slice(0,120)
           setCases(caseNo.reverse())
        })
        .then(() => {
           //console.log(chartData.labels)
           console.log(dates)
           setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        )
    } else {
        return (
            <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 15}}>
                        <Text h3 style={{fontFamily: 'FiraSans-Regular', textDecorationLine: 'underline'}}>COVID-19 : England</Text>
                        
                    </View>
    
                    {/* The table (need to do a fetch somehwere in here to get the data) */}
                    <T newCases={20000} newDeaths={1000} changeCases="-30" changeDeaths="-50" changeCasesColor="#0E5A30" changeDeathsColor="#DB5461"/>
                
                    {/* Growth in cases chart */}
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
                    <Text>Bezier Line Chart</Text>
                    <LineChart
                        data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                            data: cases,
                            color: (opacity = 1) => `rgba(2, 8, 135, ${1})`, // optional
                            strokeWidth: 2 // optional    
                            }
                        ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height= {300}
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundGradientFrom: "#fff",
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientTo: "#fff",
                            backgroundGradientToOpacity: 0,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            strokeWidth: 2, // optional, default 3
                            barPercentage: 0.5,
                            decimalPlaces: 0,
                            useShadowColorFromDataset: false // optional
                          }}
                        bezier
                        height={220}
                        withShadow = {false}
                        withDots = {false}
                        withInnerLines = {false}
                        fromZero = {true}
                        style={{
                        marginVertical: 8,
                        }}
                    />
                    </View>
                
                </ScrollView>
            </SafeAreaView>
            </>
        );
    }

    
};


export default App;
